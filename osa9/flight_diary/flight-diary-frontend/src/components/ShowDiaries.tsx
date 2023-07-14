import { DiaryEntry } from '../types';

// 9.16 mapping diary entries to show them
const ShowDiaries = ({ diaries }: { diaries: DiaryEntry[] }) => {
    return (
        <div>
            <h2>Diary Entries</h2>

            {diaries.map((diary) => (
                <div key={diary.id}>
                    <h3>{diary.date}</h3>
                    <p>visibility: {diary.visibility}</p>
                    <p>weather: {diary.weather}</p>
                    <p>{diary.comment}</p>
                </div>
            ))}

        </div>
    )
}

export default ShowDiaries;