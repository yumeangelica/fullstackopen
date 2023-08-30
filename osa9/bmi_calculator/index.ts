import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';


app.use(express.json()); // using json

//9.5 WebBMI
app.get('/bmi', (req, res) => {
    
    
    if (!req.query.height || !req.query.weight) {
        res.status(400).send({
            error: 'parameters missing'
        });
    } 

   
    else if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
        res.status(400).send({
            error: 'malformatted parameters'
        });

    } else {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        res.send({
            weight: weight,
            height: height,
            bmi: calculateBmi(height, weight)
        });
    }
   
});

//9.7 webExercises
app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;
    
    if (!target || !daily_exercises) {
        res.status(400).send({
            error: 'parameters missing'
        });
        
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    } else if (isNaN(Number(target)) || daily_exercises.some((hours: number) => isNaN(hours))) {
        res.status(400).send({
            error: 'malformatted parameters'
        });
    } 
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.send(calculateExercises(target, daily_exercises));

    
    
  });






app.get('/', (_req, res) => {

    res.send('Hello World!');

});

app.get('/hello', (_req, res) => {

    res.send('Hello Full Stack!');

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});