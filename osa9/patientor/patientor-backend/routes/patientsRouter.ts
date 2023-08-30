import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';


const router = express.Router(); // router object from express


router.get('/', (_req, res) => { // 9.11 fetches all patients without ssn
    res.send(patientService.getInsensitivePatientData());
});


router.get('/:id', (req, res) => { // 9.20 - fetches one patient with id
    const patient = patientService.getPatient(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});




router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body); // 9.12 - using the toNewPatientEntry function
        const addedPatient = patientService.addPatient(newPatient); // 9.12 - using the addPatient function
        res.json(addedPatient); // 9.12 - sends the added patient as a response
    }
    catch (e: unknown) {
        let errorMessage = 'error happened';
        if (e instanceof Error) {
            errorMessage += ': ' + e.message;
        }
        res.status(400).send(errorMessage);
    }
});




export default router;