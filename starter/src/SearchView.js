import { Link } from "react-router-dom";
import BookItem from "./BookItem";
import { useState } from "react";
import * as BooksApi from './BooksAPI'

var debounceUpdateQuery=null;
const SearchView = ({searchBookList, handleChangeCallback, setSearchBookList, bookList})=>{

  let handleChange=handleChangeCallback||(()=>{})

  const [query, setQuery] = useState("");

  
  
  const updateQuery= (searchQuery,setSearchBookList)=>{
    clearTimeout(debounceUpdateQuery);
        

    setQuery(searchQuery);

    if(searchQuery.length>0){
      debounceUpdateQuery = setTimeout(function(){
        searchBooksApiCall(searchQuery, setSearchBookList)
      },500)
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
