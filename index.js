const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.post('/run-command', (req, res) => {
    const { command } = req.body;
    
    if (!command) {
        return res.status(400).send({ error: 'No command provided' });
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send({ error: stderr || error.message });
        }
        res.send({ output: stdout });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
