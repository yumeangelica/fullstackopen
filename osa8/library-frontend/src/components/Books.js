const Books = ({show, booksResult}) => {

  if (!show) { // 8.9 if the show prop is false,
    return null
  }

  const books = [] // 8.9 create an empty array for the books

    if (booksResult.loading) { // 8.9 if the query is still loading,
        return <div>loading...</div>
    }

    if (booksResult.data) { // 8.9 if the query has finished loading,
        books.push(...booksResult.data.allBooks) // 8.9 add the books returned by the query to the array
    }


  return (
    <>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Books
