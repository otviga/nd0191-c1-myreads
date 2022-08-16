import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import * as BooksApi from './BooksAPI'

function App() {
  const [showBookList, setShowBookList] = useState(false);
  const [bookList, setBookList]=useState([]);
  const [searchBookList, setSearchBookList]=useState([]);
  const [query, setQuery] = useState("");
  const shelfList = [
    { 
      title:"Currently Reading",
      id:"currentlyReading"
    },
    { 
      title:"Want to Read",
      id:"wantToRead"
    },
    { 
      title:"Read",
      id:"read"
    }
  ]

  const updateQuery= (query)=>{
    let searchQuery=query.trim()
    setQuery(searchQuery);
    if(searchQuery.length>0){
      searchBooksApiCall(searchQuery)
    }
  }
  const clearSearch = ()=>{
    updateQuery("");
    setSearchBookList([]);
    console.log('clear')
  }

  const searchBooksApiCall = async (searchQuery)=>{
    const res = await BooksApi.search(searchQuery);
    setSearchBookList(res);
  }

  useEffect(()=>{
    const getBooks = async ()=>{
      const res = await BooksApi.getAll();
      setBookList(res);
      setShowBookList(true);
      
    }
    getBooks();
  }, [])

  const updateBookShelf = (id, shelf) => {
    let isUpdatedBook=false;
    const newBookList = bookList.map(bookItem => {
      if (bookItem.id === id) {
        isUpdatedBook=true;
        BooksApi.update(bookItem, shelf);
        return {...bookItem, shelf: shelf};
      }
      return bookItem;
    });

    setBookList(newBookList);
    return isUpdatedBook;
  };
  const addBookShelf=(book, shelf)=>{
    book.shelf=shelf;
    BooksApi.update(book, shelf);
    setBookList([...bookList, book]);
  }

  const BookItem = (book, index)=>{
    book=book.book||book;
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
            <BookSelect book={book} currentShelf={book.shelf||'none'}></BookSelect>
          </div>
          <div className="book-title">{book.title||''}</div>
          <div className="book-authors">{book.authors? book.authors.join(", "):""}</div>
        </div>
      </li>
    )
  }

  const handleChange = (e, book) => {
    if(!updateBookShelf(book.id,e.target.value)){
      addBookShelf(book,e.target.value)
    }
  }

  const BookSelect = ({book, currentShelf})=>{
    
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

  const BookShelfItem = ({title, id})=>{
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                bookList.map((book,index)=>{
                  if(book.shelf===id){
                    return (<BookItem key={index} book={book} index={index}></BookItem>)
                  }
                })
              }
              
            </ol>
          </div>
        </div>
    )
  }

  const SearchView = ()=>{
    return(
      <div className="search-books">
          <div className="search-books-bar">
          <Link to="/"  className="close-search" onClick={clearSearch}>
                        Close
                </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={(event)=>{updateQuery(event.target.value)}}
                value={query} 
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                searchBookList.map((book,index)=>{
                  
                    return (<BookItem key={index} book={book} index={index}></BookItem>)
                  
                })
              }
            </ol>
          </div>
        </div>
    )
  }

  const MainView=()=>{
    return(
      <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          {showBookList && (<div className="list-books-content">
            <div>
              {
                shelfList.map((shelItem,index)=>{
                  return(
                    <BookShelfItem title={shelItem.title} id={shelItem.id} key={index}></BookShelfItem>    
                  )
                })
              }
              
            </div>
          </div>)}
          <div className="open-search">
            <Link to="/search"  className="close-search">
                      Add a book
                </Link>
          </div>
        </div>
    )
  }

  return (

    <Routes>
      <Route exact path="/" element={
        <div className="app">
          <MainView></MainView>
        </div>
      }/>
      <Route path="/search" element={
        <div className="app">
          <SearchView></SearchView>
        </div>
      }/>
    </Routes>

  );
}

export default App;
