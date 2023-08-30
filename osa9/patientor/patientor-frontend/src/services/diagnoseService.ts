import { Diagnosis } from "../types"; // 9.24 - add Diagnosis type
import { apiBaseUrl } from "../constants";
import axios from "axios";

const getDiagnoses = async () : Promise<Diagnosis[]> => { // 9.24 - fetches diagnoses from backend
    const { data } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
    );
    return data;
};


const exportedObject = { // make exported object to contain all functions
  getDiagnoses
};


export default exportedObject;
