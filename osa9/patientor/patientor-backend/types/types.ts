export interface DiagnoseInterface { // 9.10 - interface for the diagnose object
    code: string,
    name: string,
    latin?: string
}


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry { // 9.20 - interface for the Entry object
}



export interface BaseEntry { // 9.22 - interface for the BaseEntry object
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseInterface['code']>; // 9.22 - diagnosisCodes is an array of DiagnoseInterface objects
}


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OccupationalHealthcareEntry extends BaseEntry { // 9.22 - interface for the OccupationalHealthcareEntry object
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HospitalEntry extends BaseEntry { // 9.22 - interface for the HospitalEntry object
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
}



export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}



export type EntryType = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry; // 9.22 - EntryType is a union type of the three entry types


export interface PatientInterface { // interface for the patient object
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[] // 9.20 - entries is an array of Entry objects
}



// Enums are typically used when there is a set of predetermined values that are not expected to change in the future. 
export enum Gender { // 9.13 - interface for Gender
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

export type insensitivePatientData = Omit<PatientInterface, 'ssn' | 'entries'>; // 9.13 - Omit type to remove ssn from PatientInterface

export type NewPatientEntry = Omit<PatientInterface, 'id'>; // 9.12 - Omit type to remove id from PatientInterface
