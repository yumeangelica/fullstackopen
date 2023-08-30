import express from 'express';
import diagnoseService from '../services/diagnoseService';


const router = express.Router();


router.get('/', (_req, res) => { // 9.10 fetches all diagnoses
    res.send(diagnoseService.getDiagnoses());
});


export default router;

