import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      props.setProgress(10);
      setLoading(true);

      // Updated URL without CORS proxy
      // const url = `https://newsdata.io/api/1/latest?apikey=${props.apikey}&category=${props.category}&country=${props.country}&page=${page}`;

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
      let data = await fetch(url);

      if (!data.ok) {
        const errorMessage = await data.text();
        console.error(`Error fetching news: ${data.status} - ${errorMessage}`);
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      props.setProgress(30);
      let parsedData = await data.json();

      if (!parsedData.articles || !Array.isArray(parsedData.articles)) {
        console.error("Invalid API response", parsedData);
        return;
      }

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - SwipeDaily`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1; // Move setPage logic earlier
      setPage(nextPage);

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${nextPage}&pageSize=${props.pageSize}`;
      let data = await fetch(url);

      if (!data.ok) {
        const errorMessage = await data.text();
        console.error(`Error fetching more news: ${data.status} - ${errorMessage}`);
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      let parsedData = await data.json();

      if (!parsedData.articles || !Array.isArray(parsedData.articles)) {
        console.error("Invalid API response", parsedData);
        return;
      }

      setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  return (
    <div className="my-3">
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        SwipeDaily - Top {capitalizeFirstLetter(props.category || "general")} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title || "No Title Available"}
                description={element.description || "No Description Available"}
                imageUrl={element.urlToImage || "default-image-url.jpg"} // Use placeholder image URL if none is available
                newsUrl={element.url}
                author={element.author || "Unknown"}
                date={element.publishedAt || "Unknown Date"}
                source={element.source?.name || "Unknown Source"}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "business",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
