import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

// แปลง URL ของ ES Module ปัจจุบันให้เป็น path ของไฟล์จริง
// เนื่องจาก ESM ไม่มีตัวแปร __filename และ __dirname ให้โดยอัตโนมัติ
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

// สร้าง Express application สำหรับให้บริการหน้าเกมและ API
const app = express();

// อ่านค่า PORT จาก environment variable เพื่อให้ deploy บน cloud ได้ง่าย
// หากไม่ได้กำหนดไว้ จะใช้พอร์ต 3000 สำหรับการพัฒนาในเครื่อง
const port = Number(process.env.PORT ?? 3000);

// ระบุตำแหน่งโฟลเดอร์ public แบบ absolute path
// การใช้ absolute path ช่วยลดปัญหาเมื่อสั่งรันโปรแกรมจาก working directory ที่ต่างกัน
const publicDirectory = path.resolve(currentDirectory, "../public");

// ปิด header ที่เปิดเผยว่า server ใช้ Express
// เป็น hardening ขั้นพื้นฐาน แม้ไม่ใช่มาตรการรักษาความปลอดภัยทั้งหมด
app.disable("x-powered-by");

// ให้ Express ส่งไฟล์ HTML, CSS และ JavaScript จากโฟลเดอร์ public
// maxAge ใช้ cache asset ระยะสั้นใน production แต่ไม่ cache index.html นานเกินไป
app.use(
  express.static(publicDirectory, {
    etag: true,
    fallthrough: true,
    maxAge: process.env.NODE_ENV === "production" ? "1h" : 0,
  }),
);

// Health endpoint ใช้ตรวจสอบว่า process ยังทำงานและตอบ request ได้
// ระบบ container หรือ load balancer สามารถเรียก endpoint นี้ได้
app.get("/api/health", (_request, response) => {
  response.status(200).json({
    status: "ok",
    service: "nodejs-snake-game",
    timestamp: new Date().toISOString(),
  });
});

// ส่งหน้าเกมหลักสำหรับ root path
app.get("/", (_request, response) => {
  response.sendFile(path.join(publicDirectory, "index.html"));
});

// Middleware จัดการเส้นทางที่ไม่พบ
// API จะตอบ JSON ส่วนเส้นทางเว็บทั่วไปจะตอบข้อความธรรมดา
app.use((request, response) => {
  if (request.path.startsWith("/api/")) {
    response.status(404).json({
      error: "not_found",
      message: "ไม่พบ API endpoint ที่ร้องขอ",
    });
    return;
  }

  response.status(404).type("text/plain").send("404 — Page not found");
});

// Middleware จัดการ error ขั้นสุดท้าย
// ใน production ไม่ควรส่ง stack trace ให้ client เพราะอาจเปิดเผยรายละเอียดระบบ
app.use((error, _request, response, _next) => {
  console.error("Unhandled server error:", error);

  response.status(500).json({
    error: "internal_server_error",
    message: "เกิดข้อผิดพลาดภายในระบบ",
  });
});

// เริ่ม HTTP server และเก็บ reference ไว้สำหรับ graceful shutdown
const server = app.listen(port, () => {
  console.log(`🎮 Snake Game running at http://localhost:${port}`);
});

// ฟังก์ชันปิด server อย่างเป็นระเบียบ
// หยุดรับ connection ใหม่ และรอให้ request ปัจจุบันเสร็จก่อนปิด process
function shutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);

  server.close((error) => {
    if (error) {
      console.error("Server shutdown failed:", error);
      process.exitCode = 1;
      return;
    }

    console.log("Server closed successfully.");
    process.exitCode = 0;
  });

  // ป้องกัน process ค้างไม่สิ้นสุดหากมี connection ที่ไม่ยอมปิด
  setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, 10_000).unref();
}

// รองรับสัญญาณปิดมาตรฐานของระบบปฏิบัติการและ container runtime
process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
