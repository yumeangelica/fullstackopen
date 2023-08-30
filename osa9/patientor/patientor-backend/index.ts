import express from 'express';
import cors from 'cors';


import patientsRouter from './routes/patientsRouter';
import diagnosesRouter from './routes/diagnosesRouter';


const app = express();


app.use(cors());
app.use(express.json()); // To parse the incoming data we must have the json middleware configured:

const PORT = 3003;

app.get('/api/ping', (_req, res) => { // 9.8
    console.log('someone pinged here');
    res.send('pong');
});

app.get('/', (_req, res) => {
    res.send('Hello world!');
});


app.use('/api/patients', patientsRouter); // using the patientsRouter


app.use('/api/diagnoses', diagnosesRouter); // using the diagnosesRouter



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});