import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import * as BooksApi from './BooksAPI'
import MainView from "./MainView"
import SearchView from "./SearchView";

function App() {
  const [showBookList, setShowBookList] = useState(false);
  const [bookList, setBookList]=useState([]);
  const [searchBookList, setSearchBookList]=useState([]);
  
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

  const handleChange = (e, book) => {
    if(!updateBookShelf(book.id,e.target.value)){
      addBookShelf(book,e.target.value)
    }
  }

  return (

    <Routes>
      <Route exact path="/" element={
        <div className="app">
            <MainView 
              showBookList={showBookList}
              handleChangeCallback={handleChange} 
              bookList={bookList}>
            </MainView>
        </div>
      }/>
      <Route path="/search" element={
        <div className="app">
          <SearchView
            searchBookList={searchBookList} 
            handleChangeCallback={handleChange} 
            bookList={bookList}
            setSearchBookList={setSearchBookList}>
          </SearchView>
        </div>
      }/>
    </Routes>

  );
}

export default App;
