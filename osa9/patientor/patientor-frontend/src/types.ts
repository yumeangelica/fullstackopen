export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[]; // 9.23 - add entries
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;


export interface BaseEntry { // 9.23
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating { // 9.23
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry { // 9.23
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry { // 9.23
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}


export interface HospitalEntry extends BaseEntry { // 9.23
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
}


export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry; // 9.23 - add Entry type