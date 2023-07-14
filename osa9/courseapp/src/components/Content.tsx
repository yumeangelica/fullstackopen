import Part from './Part'; //9.15
import { CoursePart } from '../types'; //9.15

// 9.14
const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <>
            {courseParts.map((coursePart, i) => // 9.15 mapping courseParts and passing them to Part component
                <Part key={i} coursePart={coursePart} />
            )}
        </>
    )
}



export default Content;