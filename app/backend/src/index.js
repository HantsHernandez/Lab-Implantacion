import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import pkg from 'pg';
const { Pool } = pkg;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const {
    DB_HOST = 'localhost',
    DB_USER = 'postgres',
    DB_PASSWORD = 'postgres',
    DB_NAME = 'todoapp',
    DB_PORT = 5432,
    PORT = 3000
} = process.env;

const poolInfo = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number(DB_PORT)
});

async function crearTabla() {
    const query = `
        CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    `;

    await poolInfo.query(query);
}

app.get('/health', async (_req, res) => {
    try {
        await poolInfo.query('SELECT 1');
        res.json({ status: 'OK', database: 'connected' });
    } catch (err) {
        res.status(500).json({ status: 'ERROR', database: 'disconnected' });
    }

});

app.get('/tasks', async (_req, res) => {
    try {
        const result = await poolInfo.query(
            "select * from tasks order by created_at desc"
        );

        return res.json(result.rows);
    } catch (error) {
        console.log('Error al obtener los registros:', error);
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({ error: 'El título es obligatorio' });
        }

        const result = await poolInfo.query(
            `insert into tasks (title) 
            values($1) RETURNING id, title, completed, created_at`
            , [title.trim()]
        );

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log('Error al crear la tarea:', error);
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { completed } = req.body;

        if (!Number.isInteger(id) || typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'Datos inválidos' });
        }

        const result = await poolInfo.query(
            `update tasks set completed = $1 where id = $2
            RETURNING id, title, completed, created_at`
            , [completed, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log('Error al actualiza la tarea:', error);
        return res.status(500).json({ error: 'Error al actualiza la tarea' })
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const result = await poolInfo.query('delete from tasks where id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar la tarea: ', error);
        return res.status(500).json({ error: 'Error al eliminar tarea' });
    }
});


(async () => {
    try {
        await crearTabla();
        app.listen(PORT, () => {
            console.log(`🚀 Servidor iniciado en http://0.0.0.0:${PORT}`);
        });
    } catch (err) {
        console.error('Error al iniciar el servidor:', err);
        process.exit(1);
    }
})();

process.on('SIGINT', async () => {
    console.log('Cerrando conexión a la base de datos...');
    await poolInfo.end();
    process.exit(0);
});