import BookItemSelect from "./BookItemSelect";

const BookItem = ({book, index, handleChangeCallback})=>{
  book=book.book||book;
  let handleChange=handleChangeCallback||(()=>{})

  return (
    <li key={index}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:`url(${book.imageLinks? book.imageLinks.smallThumbnail||'':''})`,
            }}
          ></div>
          <BookItemSelect book={book} currentShelf={book.shelf||'none'} handleChangeCallback={handleChange}></BookItemSelect>
        </div>
        <div className="book-title">{book.title||''}</div>
        <div className="book-authors">{book.authors? book.authors.join(", "):""}</div>
      </div>
    </li>
  )
}

/*const handleChange = (e, book) => {
  if(!updateBookShelf(book.id,e.target.value)){
    addBookShelf(book,e.target.value)
  }
}*/

export default BookItem;
