import BookItemSelect from "./BookItemSelect";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BookItem = ({book, index, handleChangeCallback})=>{
  book=book.book||book;
  let handleChange=handleChangeCallback||(()=>{})

  return (
    <li key={index}>
      <div className="book">
        <div className="book-top">
          <Link to={"/books/"+book.id}
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:`url(${book.imageLinks? book.imageLinks.smallThumbnail||'':''})`,
            }}
          ></Link>
          <BookItemSelect book={book} currentShelf={book.shelf||'none'} handleChangeCallback={handleChange}></BookItemSelect>
        </div>
        <div className="book-title">{book.title||''}</div>
        <div className="book-authors">{book.authors? book.authors.join(", "):""}</div>
      </div>
    </li>
  )
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleChangeCallback: PropTypes.func.isRequired
};

export default BookItem;
