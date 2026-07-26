# Module 18: AI-powered Node.js Development

> Baseline: Node.js 24 LTS, ESM, environment-based secrets, OpenAI Responses API, streaming, structured outputs, function tools, retrieval, evaluation, observability and AI security.

## 1. Learning objectives

เมื่อเรียนจบ Module นี้ ผู้เรียนจะสามารถ:

- เรียก AI API จาก Node.js อย่างปลอดภัย
- ใช้ OpenAI Responses API และ official JavaScript SDK
- สร้าง streaming response
- บังคับผลลัพธ์ด้วย JSON Schema/Structured Outputs
- ออกแบบ function tools โดยแยก model decision ออกจาก trusted application code
- อธิบาย RAG, embeddings, vector store และ citation flow
- จัดการ prompt injection, secret, PII, authorization และ cost controls
- วาง evaluation, tracing และ production observability สำหรับระบบ AI

## 2. AI application architecture

```text
User / UI
   ↓
Node.js API
   ├─ Authentication and authorization
   ├─ Input validation and moderation
   ├─ Prompt/context builder
   ├─ AI provider client
   ├─ Tool execution gateway
   ├─ Retrieval/data layer
   ├─ Output validation
   └─ Logs, metrics, traces and cost records
           ↓
       AI model
```

โมเดลไม่ควรเชื่อมฐานข้อมูลหรือระบบสำคัญโดยตรง Node.js application ต้องเป็นชั้นควบคุมสิทธิ์ ตรวจ input และตรวจ tool arguments ก่อนดำเนินการจริง

## 3. ติดตั้ง OpenAI SDK

```bash
npm install openai
```

เก็บ API key ใน environment variable:

```bash
export OPENAI_API_KEY="your_api_key_here"
```

`.env` ต้องอยู่ใน `.gitignore` และควรมีเฉพาะ `.env.example` ที่ไม่มีค่าจริง

## 4. Responses API — basic example

```js
// examples/ai/basic-response.mjs
import OpenAI from "openai";

// SDK อ่าน OPENAI_API_KEY จาก environment โดยอัตโนมัติ
const client = new OpenAI();

const response = await client.responses.create({
  model: process.env.OPENAI_MODEL ?? "gpt-5",
  input: "อธิบาย event loop ของ Node.js แบบสั้นและถูกต้อง"
});

console.log(response.output_text);
```

รัน:

```bash
node examples/ai/basic-response.mjs
```

> ควรกำหนด model ผ่าน environment/configuration เพื่อเปลี่ยนรุ่นได้โดยไม่แก้ source code

## 5. สร้าง Express endpoint

```js
import express from "express";
import OpenAI from "openai";

const app = express();
const client = new OpenAI();

app.use(express.json({ limit: "32kb" }));

app.post("/api/ai/answer", async (req, res, next) => {
  try {
    const question = String(req.body?.question ?? "").trim();

    // ป้องกัน request ว่างหรือใหญ่เกินความจำเป็น
    if (!question || question.length > 2_000) {
      return res.status(400).json({
        error: "question must contain 1-2000 characters"
      });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-5",
      input: [
        {
          role: "developer",
          content: "Answer clearly. Do not invent sources or actions."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    return res.json({ answer: response.output_text });
  } catch (error) {
    next(error);
  }
});
```

Production endpoint ต้องมี authentication, rate limiting, timeout, request ID และ audit controls ตามความเสี่ยงของระบบ

## 6. Streaming

Streaming ช่วยแสดงผลระหว่างที่โมเดลกำลังสร้างคำตอบ:

```js
import OpenAI from "openai";

const client = new OpenAI();

const stream = await client.responses.create({
  model: process.env.OPENAI_MODEL ?? "gpt-5",
  input: "สรุปแนวทางสร้าง REST API ที่ปลอดภัย",
  stream: true
});

for await (const event of stream) {
  // ตรวจ event type ก่อนอ่านข้อมูล
  if (event.type === "response.output_text.delta") {
    process.stdout.write(event.delta);
  }
}
```

เมื่อ stream ผ่าน HTTP server ต้องจัดการ:

- client disconnect
- cancellation
- timeout
- partial output
- error event
- backpressure

## 7. Structured Outputs

งานที่ต้องนำผลลัพธ์ไปใช้ใน code ควรใช้ schema แทนการ parse ข้อความอิสระ

```js
const response = await client.responses.create({
  model: process.env.OPENAI_MODEL ?? "gpt-5",
  input: "จัดหมวดความเร่งด่วนของเหตุการณ์: API production ใช้งานไม่ได้",
  text: {
    format: {
      type: "json_schema",
      name: "incident_classification",
      strict: true,
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          severity: {
            type: "string",
            enum: ["low", "medium", "high", "critical"]
          },
          reason: { type: "string" },
          needsHumanReview: { type: "boolean" }
        },
        required: ["severity", "reason", "needsHumanReview"]
      }
    }
  }
});

const result = JSON.parse(response.output_text);
console.log(result);
```

แม้ใช้ Structured Outputs แล้ว application ยังต้องตรวจ business rules เช่น allowed status transition, user permission และ database constraints

## 8. Function tools

Function tool ให้โมเดลเสนอการเรียก function แต่ Node.js เป็นผู้ตัดสินใจว่าจะอนุญาตและดำเนินการหรือไม่

```js
const tools = [
  {
    type: "function",
    name: "get_training_module",
    description: "Return one public Node.js training module by module number.",
    strict: true,
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        moduleNumber: {
          type: "integer",
          minimum: 1,
          maximum: 18
        }
      },
      required: ["moduleNumber"]
    }
  }
];

const first = await client.responses.create({
  model: process.env.OPENAI_MODEL ?? "gpt-5",
  input: "แสดงหัวข้อ Module 16",
  tools
});
```

Tool execution gateway ต้อง:

1. ตรวจชื่อ tool จาก allowlist
2. parse arguments อย่างปลอดภัย
3. validate schema ซ้ำที่ application layer
4. ตรวจ user authorization
5. จำกัด resource/time
6. log เฉพาะข้อมูลที่ไม่ลับ
7. ส่งผลลัพธ์กลับด้วย `function_call_output`

## 9. ตัวอย่าง tool execution pattern

```js
function getTrainingModule({ moduleNumber }) {
  if (!Number.isInteger(moduleNumber) || moduleNumber < 1 || moduleNumber > 18) {
    throw new TypeError("Invalid module number");
  }

  return {
    moduleNumber,
    path: `module-${String(moduleNumber).padStart(2, "0")}.md`
  };
}

for (const item of first.output) {
  if (item.type !== "function_call") continue;

  if (item.name !== "get_training_module") {
    throw new Error("Tool is not allowed");
  }

  const args = JSON.parse(item.arguments);
  const toolResult = getTrainingModule(args);

  const final = await client.responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-5",
    previous_response_id: first.id,
    input: [
      {
        type: "function_call_output",
        call_id: item.call_id,
        output: JSON.stringify(toolResult)
      }
    ]
  });

  console.log(final.output_text);
}
```

ห้ามให้ model สร้าง SQL, shell command หรือ URL แล้ว execute ทันทีโดยไม่มี validation และ authorization

## 10. RAG — Retrieval-Augmented Generation

RAG คือการค้นข้อมูลที่เชื่อถือได้ก่อน แล้วส่งเฉพาะบริบทที่เกี่ยวข้องให้โมเดล

```text
Question
   ↓
Normalize + authorize
   ↓
Search documents/vector store
   ↓
Retrieve relevant chunks
   ↓
Build grounded context
   ↓
Generate answer
   ↓
Return citations + confidence/limitations
```

RAG ไม่ได้ทำให้คำตอบถูกต้องอัตโนมัติ ต้องตรวจ:

- document freshness
- access control
- chunk quality
- retrieval recall/precision
- citation mapping
- conflicting sources
- prompt injection ภายในเอกสาร

## 11. Embeddings และ vector database

Embeddings แปลงข้อความเป็น vector เพื่อค้นหาความใกล้เคียงเชิงความหมาย

Metadata ที่ควรเก็บกับแต่ละ chunk:

```json
{
  "documentId": "node-module-16",
  "title": "Modern Git and GitHub Workflow",
  "section": "Branch protection",
  "version": "2.2.0",
  "accessLevel": "public",
  "updatedAt": "2026-07-26"
}
```

ระบบจริงต้อง filter ตาม tenant/user permission ก่อนคืน chunk ห้ามค้นทั้งคลังแล้วหวังให้โมเดลรักษาสิทธิ์เอง

## 12. Prompt injection

Prompt injection คือข้อความที่พยายามเปลี่ยนคำสั่งหรือหลอกให้ระบบเปิดเผยข้อมูล/เรียก tool ที่ไม่ควรเรียก

ตัวอย่างแนวป้องกัน:

- ถือว่า user input และ retrieved content เป็นข้อมูลที่ไม่ไว้วางใจ
- แยก instructions ออกจาก data
- ใช้ allowlist tools
- ตรวจ authorization ทุก tool call
- จำกัดผลลัพธ์และ side effects
- ขอ human approval สำหรับงานเสี่ยง
- ไม่ใส่ secret ลง prompt
- sanitize external content ก่อนแสดงผล
- ใช้ sandbox สำหรับ code execution

> ไม่มี system prompt ใดป้องกัน prompt injection ได้ 100%; การควบคุมต้องอยู่ที่ application architecture

## 13. PII และ data governance

ก่อนส่งข้อมูลไป AI provider ต้องตอบให้ได้ว่า:

- ข้อมูลประเภทใดถูกส่ง
- มี PII หรือข้อมูลลับหรือไม่
- ฐานกฎหมาย/ความยินยอมคืออะไร
- retention policy คืออะไร
- ใครเข้าถึง logs ได้
- provider/data residency policy ตรงกับข้อกำหนดหรือไม่
- ต้อง redact/tokenize ข้อมูลก่อนหรือไม่

ไม่ควร log prompt/response แบบเต็มเป็นค่าเริ่มต้นในระบบ HR, legal, health หรือข้อมูลพนักงาน

## 14. Moderation และ content controls

ระบบที่รับเนื้อหาจากผู้ใช้ควรพิจารณา:

- input moderation
- output moderation
- domain-specific policy
- age-appropriate behavior
- abuse detection
- rate limits
- escalation to human reviewer

Moderation เป็นหนึ่งในหลายชั้น ไม่ใช่ตัวแทน authorization หรือ business validation

## 15. Timeout, retry และ idempotency

```js
async function withRetry(operation, { attempts = 3 } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      // Retry เฉพาะ transient failure ตามชนิด error/status จริง
      if (attempt === attempts) break;

      const delayMs = 250 * 2 ** (attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw lastError;
}
```

ห้าม retry ทุก error เพราะ validation error และ permission error จะไม่หายจากการ retry

## 16. Cost control

ควรวัด:

- requests per user/tenant
- input/output tokens หรือ usage units
- model/provider
- latency
- cache hit rate
- tool calls
- cost by feature
- budget alerts

วิธีควบคุมต้นทุน:

- จำกัด input size
- สรุป history เก่า
- เลือก model ตามความซับซ้อนของงาน
- cache ผลลัพธ์ที่เหมาะสม
- batch งานที่ไม่เร่งด่วน
- stop tool loop ด้วย maximum steps
- ตั้ง per-user/per-tenant quota

## 17. AI evaluation

อย่าประเมินระบบ AI จากตัวอย่างสวยเพียงไม่กี่คำถาม ควรมี evaluation dataset ที่ครอบคลุม:

- common cases
- edge cases
- ambiguous input
- adversarial/prompt-injection cases
- multilingual input
- incorrect or missing context
- authorization boundaries

Metrics อาจประกอบด้วย:

- groundedness
- factual accuracy
- citation correctness
- schema validity
- tool-call accuracy
- refusal correctness
- latency
- cost
- human rating

## 18. Regression evaluation

```text
Prompt/model/tool change
        ↓
Run fixed evaluation dataset
        ↓
Compare with baseline
        ↓
Review regressions
        ↓
Approve deployment
```

AI model behavior เปลี่ยนได้แม้ application code ไม่เปลี่ยน จึงควรบันทึก model identifier, prompt version, tool schema version และ evaluation result

## 19. Observability

บันทึก metadata ที่จำเป็นโดยหลีกเลี่ยงข้อมูลลับ:

```json
{
  "requestId": "req_123",
  "feature": "training-assistant",
  "model": "configured-model",
  "latencyMs": 1280,
  "status": "completed",
  "toolCalls": 1,
  "promptVersion": "training-v3",
  "schemaVersion": "answer-v2"
}
```

ควรมี traces สำหรับ:

- retrieval
- model request
- tool call
- validation
- post-processing
- user-visible response

## 20. Multi-provider design

หากต้องรองรับหลาย provider ให้สร้าง adapter interface:

```js
export class AIProvider {
  async generate(_request) {
    throw new Error("Not implemented");
  }
}
```

แยก concerns:

- provider-specific SDK
- normalized request/response
- retry policy
- model routing
- usage/cost reporting
- safety policy

ไม่ควรออกแบบ lowest-common-denominator จนเสียความสามารถสำคัญของแต่ละ provider

## 21. MCP และ external tools

Model Context Protocol (MCP) ช่วยให้ AI client เชื่อม tools/resources ผ่าน interface ที่เป็นมาตรฐานมากขึ้น

ก่อนเชื่อม MCP server ต้องตรวจ:

- server identity และ trust boundary
- tools/resources ที่เปิดให้ใช้
- authentication
- data sent to third party
- approval requirement
- rate/resource limits
- logging และ incident response

External MCP server เป็น third-party service; ข้อมูลที่ส่งออกไปอยู่ภายใต้นโยบายของบริการนั้นด้วย

## 22. Agent workflow

Agent ไม่ใช่เพียง prompt ยาว แต่เป็น loop:

```text
Goal
 ↓
Plan / select next action
 ↓
Call tool
 ↓
Observe result
 ↓
Validate policy and completion
 ↓
Continue or stop
```

ต้องกำหนด:

- maximum steps
- maximum cost/time
- allowed tools
- human approval gates
- stop conditions
- state persistence
- replay/audit trail
- failure recovery

## 23. Human-in-the-loop

ต้องให้มนุษย์อนุมัติก่อน action ที่มีผลกระทบสูง เช่น:

- ส่งข้อความภายนอก
- แก้ข้อมูล production
- อนุมัติสิทธิ์
- ตัดสินใจด้านบุคคล/กฎหมาย
- ใช้งบประมาณ
- ลบหรือเผยแพร่ข้อมูล

AI สามารถสรุปและเสนอแนะได้ แต่ authority ต้องอยู่ที่ผู้มีหน้าที่และระบบควบคุม

## 24. Production checklist

- [ ] API key ไม่อยู่ใน source code
- [ ] input ผ่าน validation และ size limit
- [ ] endpoint มี auth/rate limit
- [ ] tool ใช้ allowlist และตรวจ authorization
- [ ] output ที่ machine-consumed ใช้ schema
- [ ] RAG filter ตามสิทธิ์ผู้ใช้
- [ ] logs ไม่เก็บ secret/PII โดยไม่จำเป็น
- [ ] มี timeout, retry policy และ cancellation
- [ ] มี cost quota/alerts
- [ ] มี evaluation และ regression gate
- [ ] high-impact action มี human approval
- [ ] มี incident response และ kill switch

## 25. Capstone projects

### Project A — AI CLI
รับคำถามจาก command line และแสดง streaming output

### Project B — AI REST API
Express endpoint พร้อม validation, rate limit, structured output และ tests

### Project C — File-grounded assistant
ค้นเอกสารจาก approved knowledge base พร้อม citations และ access control

### Project D — Tool-using agent
ใช้ tool ที่อ่านข้อมูลแบบ read-only พร้อม allowlist, audit log และ maximum steps

### Project E — AI dashboard
แสดง latency, usage, cost, error rate, evaluation score และ tool-call success rate

## 26. Official references

- OpenAI Platform documentation: JavaScript quickstart, Responses API, streaming, tools and Structured Outputs
- Node.js documentation: ESM, fetch, streams, test runner and diagnostics
- OWASP guidance: LLM/AI application security and web application controls

---

End of the **Node.js Professional Learning Path — Modules 1–18**
