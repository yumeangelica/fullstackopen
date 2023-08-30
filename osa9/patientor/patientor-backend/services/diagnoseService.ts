import diagnosesData from "../data/diagnoses";

import { DiagnoseInterface } from "../types/types"; 

// 9.10
const diagnoses: DiagnoseInterface[] = diagnosesData; // diagnosesData is an array of DiagnoseInterface objects

const getDiagnoses = (): DiagnoseInterface[] => { // returns diagnoses array
  return diagnoses;
};


export default { // exporting an object with a function
  getDiagnoses
};