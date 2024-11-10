const express = require('express');
const multer = require('multer');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const upload = multer({ storage: multer.memoryStorage() });

const dbConfig = {
    user: 'sa',
    password: '1234',
    server: 'sqlserver://localhost:1433',
    database: 'ITCDB'
};

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const pool = await sql.connect(dbConfig);
        const request = new sql.Request(pool);

        request.input('image', sql.VarBinary(sql.MAX), req.file.buffer);

        const result = await request.query('INSERT INTO ApplicationImagecd (Image) VALUES (@image)');
        res.status(200).json({ message: 'Image uploaded successfully', result });
    } catch (error) {
        console.error('SQL error:', error);
        res.status(500).json({ message: 'Image upload failed', error });
    }
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});