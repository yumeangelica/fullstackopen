import Header from './components/Header'; // 9.14 imports
import Content from './components/Content';
import Total from './components/Total';

import { CoursePart } from './types'; // 9.15 import CoursePart type


const App = () => {
    const courseName = "Half Stack application development";

    const courseParts: CoursePart[] = [ // 9.15 courseParts array
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part",
            kind: "basic"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            kind: "group"
        },
        {
            name: "Basics of type Narrowing",
            exerciseCount: 7,
            description: "How to go from unknown to string",
            kind: "basic"
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
            kind: "background"
        },
        {
            name: "TypeScript in frontend",
            exerciseCount: 10,
            description: "a hard part",
            kind: "basic",
        },
        {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            kind: "special"
        }
    ];

    // rendering components
    return (
        <>
            <Header courseName={courseName} />

            <Content courseParts={courseParts} />

            <Total courseParts={courseParts} />

        </>
    );
};

export default App;