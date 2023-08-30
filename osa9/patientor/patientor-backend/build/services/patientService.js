"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
// 9.11
const patients = patients_1.default; // patientsData is an array of PatientInterface objects
// return all patientdata
const getPatientData = () => {
    return patients;
};
// 9.13 - returns patientdata array without ssn
const getInsensitivePatientData = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
exports.default = {
    getPatientData, getInsensitivePatientData
};
