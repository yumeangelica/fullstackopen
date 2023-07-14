// 9.15

import { CoursePart } from "../types" // 9.15 import CoursePart type

const assertNever = (value: never): never => { // 9.15 assertNever function
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => { // 9.15 Part component that renders different course parts based on their kind

    switch (coursePart.kind) { // switch case for different course parts based on their kind
        case "basic": // basic course part
            return (
                <>
                    <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                    <p>{coursePart.description}</p>
                </>
            )
        case "group": // group course part
            return (
                <>
                    <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                    <p>project exercises {coursePart.groupProjectCount}</p>
                </>
            )
        case "background": // background course part
            return (
                <>
                    <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                    <p>{coursePart.description}</p>
                    <p>background material: {coursePart.backgroundMaterial}</p>
                </>
            )
        case "special": // special course part
            return (
                <>
                    <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                    <p>{coursePart.description}</p>
                    <p>required skills: {coursePart.requirements.join(", ")}</p>
                </>
            )
        default: // default case for assertNever
            return assertNever(coursePart)
    }
}


export default Part