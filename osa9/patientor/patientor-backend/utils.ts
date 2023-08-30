/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Gender } from "./types/types";
import { NewPatientEntry } from "./types/types";



// validate text string
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};



// validate date
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};



// validate Gender enum
const isGender = (parameter: any): parameter is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(parameter);
};



// parse and validate name from request body
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name}`);
    }
    return name;
};



// parse and validate date of birth from request body
const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error(`Incorrect or missing date of birth: ${dateOfBirth}`);
    }
    return dateOfBirth;
};



// parse and validate ssn from request body
const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }
    return ssn;
};

// parse and validate occupation from request body
const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};

const parseGender = (gender: unknown): Gender => { // 9.13 - parseGender function
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing ${gender}`);
    }
    return gender;
};




// parse and validate all entries from request POST body
const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newPatient: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: object.entries
    };
    return newPatient;
};

export default toNewPatientEntry;