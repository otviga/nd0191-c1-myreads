
const BookItemSelect = ({book, currentShelf, handleChangeCallback})=>{
  let handleChange=handleChangeCallback||(()=>{})
  return(
    <div className="book-shelf-changer">
            <select onChange={(e) => handleChange(e, book)} value={currentShelf}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">
                Currently Reading
              </option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
  )
}

export default BookItemSelect;
