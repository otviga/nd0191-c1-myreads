import BookItem from "./BookItem";

const BookShelfItem = ({title, id, bookList, handleChangeCallback})=>{
  let handleChange=handleChangeCallback||(()=>{})
  return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              bookList.map((book,index)=>{
                if(book.shelf===id){
                  return (<BookItem key={index} book={book} index={index} handleChangeCallback={handleChange}></BookItem>)
                }
                return "";
              })
            }
            
          </ol>
        </div>
      </div>
  )
}

export default BookShelfItem;
