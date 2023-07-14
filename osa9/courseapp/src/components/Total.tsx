// 9.14

const Total = ({ courseParts }: { courseParts: Array<{ name: string, exerciseCount: number }> }) => {
    return (
        <>
            <p>
                Number of exercises{" "}
                {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </>
    )
}


export default Total;