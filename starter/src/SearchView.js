import { Link } from "react-router-dom";
import BookItem from "./BookItem";
import { useState } from "react";
import * as BooksApi from './BooksAPI'

const SearchView = ({searchBookList, handleChangeCallback, setSearchBookList, bookList})=>{

  let handleChange=handleChangeCallback||(()=>{})

  const [query, setQuery] = useState("");

  const updateQuery= (query,setSearchBookList)=>{
    let searchQuery=query;
    setQuery(searchQuery);
    if(searchQuery.length>0){
      searchBooksApiCall(searchQuery, setSearchBookList)
    }
    else{
      setSearchBookList([])
    }
  }
  const clearSearch = ()=>{
    updateQuery("");
  }

  const searchBooksApiCall = async (searchQuery, setSearchBookList)=>{
    const res = await BooksApi.search(searchQuery);
    const searchBooks = Array.isArray(res)?res:[];
    setSearchBookList(searchBooks);
  }


  return(
    <div className="search-books">
        <div className="search-books-bar">
        <Link to="/"  className="close-search" onClick={()=>{clearSearch()}}>
                      Close
              </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={(event)=>{updateQuery(event.target.value, setSearchBookList)}}
              value={query} 
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              searchBookList.map((book,index)=>{
                  let tmpBook=bookList.filter(x=>x.id===book.id)
                  if(tmpBook.length>0){
                    book.shelf=tmpBook[0].shelf;
                  }
                  return (<BookItem key={index} book={book} index={index} handleChangeCallback={handleChange}></BookItem>)
              })
            }
          </ol>
        </div>
      </div>
  )
}

export default SearchView;
