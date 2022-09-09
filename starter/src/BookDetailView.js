import { useState, useEffect } from "react";
import * as BooksApi from './BooksAPI'
import { Link, useParams } from "react-router-dom";


const BookDetailView = ()=>{
  let { id } = useParams();  
  id=id||{};

  const [currentBook, setCurrentBook] = useState({})
  const [showCurrentBookDetails, setShowCurrentBookDetails] = useState(false)

  useEffect(()=>{
    const getBookDetail = async ()=>{
      const res = await BooksApi.get(id);
      setCurrentBook(res);
      setShowCurrentBookDetails(true);
    }
    getBookDetail();
  }, [id])

    const getValue=(key)=>{
      return JSON.stringify(currentBook[key]);
    }

  return(
    <div className="search-books">
        <div className="search-books-bar">
        <Link to="/"  className="close-search">
                      Close
              </Link>
          <div className="search-books-input-wrapper book-details">
            {showCurrentBookDetails && currentBook.title}
          </div>
        </div>
        <div className="search-books-results">
        {showCurrentBookDetails && (

          <table>
            <tbody>
              {Object.keys(currentBook).map((book, index)=>{
                  return (
                    <tr key={index}>
                      <td>{book}</td>
                      <td>{getValue(book)}</td>
                    </tr>
                  )
              })}
            </tbody>
          </table>
          )}
        </div>
      </div>
  )
}

export default BookDetailView;
