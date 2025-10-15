import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import fs from 'node:fs'
import path from 'node:path'
const { Pool } = require('pg');

const app = express()
const PORT = process.env.PORT || 3001
const DATA_DIR = '/data'
const FILE = path.join(DATA_DIR, 'tasks.json')

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

function ensureStore() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
    if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify([]), 'utf-8')
}


app.get('/tasks', (_req, res) => {
    
});

app.post('/tasks', (req, res) => {
    
});

app.put('/tasks/:id', (req, res) => {
    
});

app.delete('/tasks/:id', (req, res) => {
    
});

app.get('/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
    ensureStore()
    console.log(`API on http://localhost:${PORT}`)
})
