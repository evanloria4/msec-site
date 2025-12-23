import express from 'express';
import path from 'path';
import cors from 'cors';
import { contactRouter } from './routes/contact';

const DIST_DIR = path.resolve(__dirname, '..', '..', 'dist');

const app = express();

/* ---------------- Middleware ---------------- */
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- Routes ---------------- */
app.use('/api/contact', contactRouter );

// Serve static files from the dist directory 
app.use(express.static(DIST_DIR));

// SPA fallback (LAST)
app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

export default app;
