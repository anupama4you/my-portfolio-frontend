import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Social from "./Social";
import { RotatingLines } from "react-loader-spinner";

Modal.setAppElement("#root");

const News = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});
  const [visibleItems, setVisibleItems] = useState(10); 
  const increment = 10;
  const [news, setnews] = useState({ articles: [] }); 
  const [newsLoaded, setnewsLoaded] = useState(false);

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + increment);
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    loadMoreItems();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function toggleModal(e, article) {
    setIsOpen(!isOpen);
    setCurrentArticle(article);
    e.preventDefault();
  }

  const fetchData = async () => {
    try {
      const response = await fetch('https://gnews.io/api/v4/top-headlines?category=technology&lang=en&max=10&apikey=8218b441760ff3cd4b64dc88111a9bfb');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const filteredArticles = data.articles.filter(article => article.image != null);
      return { ...data, articles: filteredArticles };
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  function BlogTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return (
      formattedDate
    );
  }

  useEffect(() => {
    fetchData().then(data => {
      if (data) {
        setnews(data)
        setnewsLoaded(true)
      }
    });
  }, []);  

  return (
    <>
      <div className="container">
        <div className="tokyo_tm_news">
          <div className="tokyo_tm_title">
            <div className="title_flex">
              <div className="left">
                <span>News</span>
                <h3>Latest Tech News</h3>
              </div>
            </div>
          </div>
          {/* END TITLE */}
          {
            !newsLoaded && (
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="300"
                visible={true}
              />
            )
          }

          <ul>
          {news && news.articles.slice(0, visibleItems).map((item, index) => (
            <li key={index} data-aos="fade-right" data-aos-duration="1200">
              <div className="list_inner">
              <a href={item.url} target="_blank">
                <div className="image">
                  <img src="assets/img/thumbs/4-3.jpg" alt="thumb" />
                  <div
                    className="main"
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  ></div>
                </div></a>
                {/* END IMAGE */}
                <div className="details">
                  <div className="extra">
                    <p className="date">
                    {item.source != null && (
                          <>
                            By <a href="#">{item.source.name}</a>
                          </>
                        )}
                      <span>{BlogTimestamp(item.publishedAt)}</span>
                    </p>
                  </div>
                  {/* END EXTRA */}
                  <a href={item.url} target="_blank">
                  <h3 className="title">
                    {item.title}
                  </h3></a> 
                  <p>{item.description}</p>
                  
                  <div className="tokyo_tm_read_more">
                    <a href={item.url} target="_blank">
                      <span>{item.source.name}</span>
                    </a>
                  </div>
                  {/* END READ MORE BUTTON */}
                </div>
                {/* END DETAILS */}
              </div>
            </li>
             ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default News;
