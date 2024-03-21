import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capatilizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const Url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=75ac9ae3a64449d3be0055b619fafd99&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);

    let data = await fetch(Url);
    props.setProgress(30);

    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${capatilizeFirstLetter(props.category)} - WebJKNews`;

    updateNews();
  },[]);

  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // };

  // const handlePreviousClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };
  const fetchMoreData = async () => {
    const Url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=75ac9ae3a64449d3be0055b619fafd99&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(Url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "40px 0px", marginTop: "90px", }}
      >
        WebJkNews - Top {capatilizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
       
      >
        <div className="container" >
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 0,
  category: "general",
};
News.PropTypo = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
