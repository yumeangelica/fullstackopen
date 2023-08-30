"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoseService_1 = __importDefault(require("./services/diagnoseService"));
const patientService_1 = __importDefault(require("./services/patientService"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3003;
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.get('/', (_req, res) => {
    res.send('Hello world!');
});
app.get('/api/patients', (_req, res) => {
    res.send(patientService_1.default.getInsensitivePatientData());
});
app.get('/api/diagnoses', (_req, res) => {
    res.send(diagnoseService_1.default.getDiagnoses());
});
//korjaa myöhemmin
//posting new patient
// app.post('/api/patients', (req, res) => { // 9.12
//     try {
//         const newPatient = toNewPatient(req.body);
//         const addedPatient = patientService.addPatient(newPatient);
//         res.json(addedPatient);
//     }
//     catch (e) {
//         res.status(400).send(e.message);
//     }
// });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
