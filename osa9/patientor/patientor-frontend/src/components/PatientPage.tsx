import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; // 9.21 - useParams hook to get id from url
import { Patient, Diagnosis} from '../types';
import patientService from '../services/patientService';
import diagnoseService from '../services/diagnoseService'; // 9.24 - diagnoses service


import EntryDetails from "./EntryDetails"; // 9.25 - entry details

// 9.21 - single patient page
const PatientPage = () => {

    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]); // 9.24 - diagnoses state

    useEffect(() => {
        const getDiagnoses = async () => { // trying to get diagnoses from server
            try {
                const diagnoses = await diagnoseService.getDiagnoses(); // get diagnoses from server
                setDiagnoses(diagnoses); // set diagnoses to state
            } catch (e) { // if error
                console.log(e);
            }
        };
        void getDiagnoses(); // call function
    }
        , []); // if id changes, call function



    const [patient, setPatient] = useState<Patient | undefined>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const getPatient = async () => { // trying to get patient from server
            try {
                if (id) { // if id exists
                    const patient = await patientService.getOnePatient(id); // get patient from server
                    setPatient(patient); // set patient to state
                }
            } catch (e) { // if error
                console.log(e);
            }
        };
        void getPatient(); // call function
    }
        , [id]); // if id changes, call function


    return (
        <>

            <h2>{patient?.name}</h2>
            <p>gender: {patient?.gender}</p>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>

            <> {/* 9.23 - entries */}
                <h3>entries</h3>
                {patient?.entries.map(entry => (
                    <div key={entry.id}>
                        {/* <p>{entry.date} {entry.description}</p> */}


                        <div> {/* 9.24 - diagnoses and descriptions */}
                            {entry.diagnosisCodes?.map(code => (

                                <ul>
                                    <li key={code}>{code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}</li>
                                </ul>
                            ))}

                        </div>

                        <EntryDetails entry={entry} /> {/* 9.25 - entry details component */}

                    </div>
                ))}
            </>

        </>

    )
};


export default PatientPage;