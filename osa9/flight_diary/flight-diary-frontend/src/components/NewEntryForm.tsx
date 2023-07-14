
interface NewEntryFormProps { // 9.19 - add interface for props, to fix type error
    addEntry: (
        event: React.FormEvent<HTMLFormElement>
    ) => void
}

// 9.17 - add new entry, using addEntry function  & diaryservice to post data to server
const NewEntryForm = ({ addEntry }: NewEntryFormProps ) => {
    return (
        <>
            <h2>Enter new entry</h2>
            <form onSubmit={addEntry}>
                <div>
                    Date: <input type="date" name="date" /> {/* 9.19 - add date input */}
                </div>
                <div> {/* 9.19 - add radio buttons for visibility*/}
                    <input type="radio" name="visibility" value="great" /> great
                    <input type="radio" name="visibility" value="good" /> good
                    <input type="radio" name="visibility" value="ok" /> ok
                    <input type="radio" name="visibility" value="poor" /> poor
                </div>


                <div> {/* 9.19 - add radio buttons for weather*/}
                    <input type="radio" name="weather" value="sunny" /> sunny
                    <input type="radio" name="weather" value="rainy" /> rainy
                    <input type="radio" name="weather" value="cloudy" /> cloudy
                    <input type="radio" name="weather" value="stormy" /> stormy
                    <input type="radio" name="weather" value="windy" /> windy
                </div>

                <div>
                    Comment: <input name="comment" />
                </div>
                <button type="submit">save</button>
            </form>
        </>
    )
}

export default NewEntryForm;