import { Link } from "react-router-dom";
import BookItem from "./BookItem";
import { useState } from "react";
import * as BooksApi from './BooksAPI'

const SearchView = ({searchBookList, handleChangeCallback, setSearchBookList})=>{

  let handleChange=handleChangeCallback||(()=>{})

  const [query, setQuery] = useState("");

  const updateQuery= (query,setSearchBookList)=>{
    let searchQuery=query.trim()
    setQuery(searchQuery);
    if(searchQuery.length>0){
      searchBooksApiCall(searchQuery, setSearchBookList)
    }
  }
  const clearSearch = (setSearchBookList)=>{
    updateQuery("");
    setSearchBookList([]);
    console.log('clear')
  }

  const searchBooksApiCall = async (searchQuery, setSearchBookList)=>{
    const res = await BooksApi.search(searchQuery);
    setSearchBookList(res);
  }


  return(
    <div className="search-books">
        <div className="search-books-bar">
        <Link to="/"  className="close-search" onClick={()=>{clearSearch(setSearchBookList)}}>
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
                  return (<BookItem key={index} book={book} index={index} handleChangeCallback={handleChange}></BookItem>)
              })
            }
          </ol>
        </div>
      </div>
  )
}

export default SearchView;
