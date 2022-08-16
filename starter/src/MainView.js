import { Link } from "react-router-dom";
import BookShelfItem from "./BookShelfItem";

const MainView=({handleChangeCallback, showBookList, bookList})=>{
  let handleChange=handleChangeCallback||(()=>{})
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
                  <BookShelfItem title={shelItem.title} id={shelItem.id} key={index} handleChangeCallback={handleChange} bookList={bookList}></BookShelfItem>    
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

export default MainView;
