import patientsData from "../data/patients";
import { PatientInterface } from "../types/types"; // importing the PatientInterface interface
import { insensitivePatientData } from "../types/types"; // importing the insensitivePatientData type
import { NewPatientEntry } from "../types/types"; // importing the NewPatient type
import { v4 as uuidv4 } from 'uuid'; // 9.12 - importing uuidv4 function from uuid library


const newId: string = uuidv4(); // 9.12 - generates a new id for the new patient


// 9.11
const patients: PatientInterface[] = patientsData; // patientsData is an array of PatientInterface objects

// return all patientdata
const getPatientData = (): PatientInterface[] => { // returns patients array
    return patients;
};

// 9.13 - returns patientdata array without ssn
const getInsensitivePatientData = (): insensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation  }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};


const getPatient = (id: string): PatientInterface | undefined => { // returns one patient, if not found returns undefined
    return patients.find(patient => patient.id === id);
};


// 9.12 - adds new patient to patients array
const addPatient = (patient: NewPatientEntry): PatientInterface => {
    const newPatient = { // creating a new patient object
        id: newId, // 9.12 - using the newId variable, unique id for each patient
        ...patient // 9.12 - using the patient object
    };

    patients.push(newPatient); // adding the new patient to the patients array
    return newPatient; // returning the new patient
};



export default { // exporting an object with a function
    getPatientData, getInsensitivePatientData, getPatient, addPatient
};