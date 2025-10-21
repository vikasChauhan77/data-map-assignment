import express from 'express';
import cors from 'cors';
import sample from './sample.json' with { type: 'json' };

const app = express();
const port = 3000;

app.use(cors());

app.get('/data', async (req, res) => {
    res.json(sample.data);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;