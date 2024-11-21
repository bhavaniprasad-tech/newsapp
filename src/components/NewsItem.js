import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add Bootstrap import

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  return (
    <div className='my-3'>
      <div className="card">
        <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img 
          src={!imageUrl ? "https://www.reuters.com/resizer/v2/MLSL2BKL7FIBHKBT5MMHXJDSKQ.jpg?auth=fafe9f2e030719cba751d150332401d021532afee84e3fe20324233febf8f0cb&height=1005&width=1920&quality=80&smart=true" : imageUrl} 
          className="card-img-top" 
          alt="News"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className='card-text'>
            <small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small>
          </p>
          <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
