import express from 'express';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
const cors = require('cors') // 9.16 - fix CORS error

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
app.use(cors()) // 9.16 - fix CORS error


app.use(express.json());

import diaryRouter from './routes/diaries';

const PORT = 3003; // 9.16  change port to 3003

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
