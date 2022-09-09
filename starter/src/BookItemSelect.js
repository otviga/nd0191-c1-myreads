
import PropTypes from "prop-types";

const BookItemSelect = ({book, currentShelf, handleChangeCallback})=>{
  let handleChange=handleChangeCallback||(()=>{})
  return(
    <div className="book-shelf-changer">
            <select onChange={(e) => handleChange(e, book)} value={currentShelf}>
              <option value="empty" disabled>
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

BookItemSelect.propTypes = {
  book: PropTypes.object.isRequired,
  currentShelf: PropTypes.string.isRequired,
  handleChangeCallback: PropTypes.func.isRequired
};

export default BookItemSelect;
