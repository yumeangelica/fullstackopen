import { Container } from '@mui/material';

import { Entry } from "../types"; // 9.25 - entry details


const assertNever = (value: never): never => { // 9.25 - assert never function
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}

const EntryDetails = ({ entry }: { entry: Entry }) => { // 9.25 - entry details
    switch (entry.type) { // switch case for entry type
        case "Hospital": // if hospital
            return ( // return hospital details
                <Container sx={{ border: 1, borderColor: 'grey.500', borderRadius: 1, padding: 1 }}>
                    <p>{entry.date}</p>
                    <p>{entry.description}</p>
                    <p>discharge: {entry.discharge.date} {entry.discharge.criteria}</p>
                    <p>specialist: {entry.specialist}</p>
                </Container>
            );
        case "OccupationalHealthcare":  // if occupational healthcare
            return ( // return occupational healthcare details
                <Container sx={{ border: 1, borderColor: 'grey.500', borderRadius: 1, padding: 1 }}>
                    <p>{entry.date}</p>
                    <p>{entry.description}</p>
                    <p>employer: {entry.employerName}</p>
                    <p>sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>
                    <p>specialist: {entry.specialist}</p>
                </Container>
            );
        case "HealthCheck": // if health check
            return ( // return health check details
                <Container sx={{ border: 1, borderColor: 'grey.500', borderRadius: 1, padding: 1 }}>
                    <p>{entry.date}</p>
                    <p>{entry.description}</p>
                    <p>health check rating: {entry.healthCheckRating}</p>
                    <p>specialist: {entry.specialist}</p>
                </Container>
            );
        default: // if none of the above
            return assertNever(entry); // call assert never function
    }
};

export default EntryDetails;


