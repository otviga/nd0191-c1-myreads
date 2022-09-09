import { Link } from "react-router-dom";

const NotFoundView = ()=>{

  return(
    <div className="search-books">
        <div className="search-books-bar">
        <Link to="/"  className="close-search">
                      Close
              </Link>
          <div className="search-books-input-wrapper not-found">
            404
          </div>
        </div>
        <div className="search-books-results">
          Not Found
        </div>
      </div>
  )
}

export default NotFoundView;
