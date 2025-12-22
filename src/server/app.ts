import express from 'express';
import path from 'path';
import cors from 'cors';

const DIST_DIR = path.resolve(__dirname, '..', '..', 'dist');

const app = express();

/* ---------------- Middleware ---------------- */
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- Routes ---------------- */

// Serve static files from the dist directory 
app.use(express.static(DIST_DIR));

export default app;
