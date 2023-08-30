import axios from "axios";
import { Patient, PatientFormValues } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => { // fetch all patients
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOnePatient = async (id: string) => { // fetch one patient
    const { data } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
    );
    return data;
};


const create = async (object: PatientFormValues) => { // create new patient
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};



const exportedObject = { // make exported object to contain all functions
  getAll, create, getOnePatient
};


export default exportedObject;
