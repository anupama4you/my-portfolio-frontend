import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Social from "../Social";
import ReactMarkdown from 'react-markdown';
import { RotatingLines } from "react-loader-spinner";

Modal.setAppElement("#root");

const Services = ({setservicesData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/services`, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchData().then(data => {
      if (data && data['data']) {
        setServices(data['data']);
        setservicesData(true);
      }
    });
  }, []);  

  function toggleModal(e, article) {
    setIsOpen(!isOpen);
    setCurrentArticle(article);
    e.preventDefault();
  }

  const serviceContent = services.map((service, index) => {
    return {
      id: service.id,
      no: `0${index + 1}`,
      title: service.attributes.title, 
      text: service.attributes.moreinfo,
      article: service.attributes.moreinfo,
    };
  });
  
  return (
    <>
      {serviceContent.map((item) => (
        <li key={item.id}>
          <div className="list_inner">
            <span className="number">{item.no}</span>
            <h3 className="title">{item.title}</h3>
            <p className="text">
              {item.text.length > 80 ? item.text.slice(0, 80) + '...' : item.text}
            </p>
            <div className="tokyo_tm_read_more">
              <a href="#" onClick={(e) => toggleModal(e, item.article)}>
                <span>Read More</span>
              </a>
            </div>
          </div>
        </li>
      ))}

      {/* START MODAL */}
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div className="tokyo_tm_modalbox_news">
          <button className="close-modal" onClick={toggleModal}>
            <img src={"assets/img/svg/cancel.svg"} alt="close icon" />
          </button>
          {/* END CLOSE ICON */}
          <div className="box_inner">
            <div className="description_wrap scrollable">
              {/* END IMAGE */}
              <div className="details">
                {/* <div className="extra"> */}
                  <p className="date">
                    By <a href="#">Anupama Dilshan</a>
                    <span>05 April 2021</span>
                  </p>
                {/* </div> */}
              </div>
              {/* END DETAILS */}
              <div className="main_content ">
                <div className="descriptions">
                <ReactMarkdown>
                  {currentArticle}
                </ReactMarkdown>

              
                  {/* <div className="quotebox">
                    <div className="icon">
                      <img
                        className="svg"
                        src="assets/img/svg/quote.svg"
                        alt="tumb"
                      />
                    </div>
                    <p>
                      Most photographers find it hard to see interesting
                      pictures in places in which they are most familiar. A trip
                      somewhere new seems always exactly what our photography
                      needed, as shooting away from home consistently inspires
                      us to new artistic heights.
                    </p>
                  </div> */}
                  {/* END QUOTEBOX */}
                
                </div>
                {/* END DESCRIPTION */}
                <div className="news_share">
                  <span>Share:</span>
                  <Social />
                  {/* END SOCIAL SHARE */}
                </div>
                {/* END NEWS SHARE */}
              </div>
            </div>
          </div>
          {/* END BOX INNER */}
        </div>
        {/* END MODALBOX NEWS */}
      </Modal>
      {/* END MODAL */}
    </>
  );
};

export default Services;
