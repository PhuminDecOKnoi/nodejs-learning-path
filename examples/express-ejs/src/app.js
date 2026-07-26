import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_request, response) => {
  response.render('index', {
    title: 'Node.js Learning Path',
    nodeVersion: process.version,
  });
});

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    runtime: process.version,
    timestamp: new Date().toISOString(),
  });
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
