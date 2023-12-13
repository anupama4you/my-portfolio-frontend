import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Gallery, Item } from "react-photoswipe-gallery";
import ReactTooltip from "react-tooltip";
import ModalVideo from "react-modal-video";
import Modal from "react-modal";
import Social from "./Social";
import ReactMarkdown from 'react-markdown';
import { RotatingLines } from "react-loader-spinner";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [projectsLoaded, setprojectsLoaded] = useState(false);

  // for popup video for youtube
  const [isOpen, setOpen] = useState(false);

  // popup video for vimeo
  const [isOpen2, setOpen2] = useState(false);

  // for modal details
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  // for modal details method
  function toggleModalThree() {
    setIsOpen3(!isOpen3);
  }
  function toggleModalFour() {
    setIsOpen4(!isOpen4);
  }

  const handleTabChange = (category) => {
    setActiveCategory(category);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects?populate=*`, {
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
        setProjects(data['data']);
        setprojectsLoaded(true)
      }
    });
  }, []);  

  const projectsContent = projects.map((service, index) => {
    return {
      id: service.id,
      no: `0${index + 1}`,
      title: service.attributes.title, 
      category: service.attributes.category,
      image: service.attributes.image,
      details: service.attributes.details,
      images: service.attributes.images.data,
    };
  });

  const filteredProjects = projectsContent.filter((item) => {
    return activeCategory === 'All' || item.category.includes(activeCategory);
  });

  function toggleModal(e, article, images) {
    setOpen(!isOpen);
    setCurrentArticle(article);
    setImages(images);
    e.preventDefault();
  }

  const categories = ['All', 'Mobile Application', 'Web Application', 'Machine Learning', 'UI/UX', 'Branding'];

  return (
    <>
      <Gallery>
        <div className="container">
          <div className="tokyo_tm_portfolio">
            <div className="tokyo_tm_title">
              <div className="title_flex">
                <div className="left">
                  <span>Portfolio</span>
                  <h3>Projects</h3>
                </div>
              </div>
            </div>
            {/* END TOKYO_TM_TITLE */}

            {
            !projectsLoaded && (
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="300"
                visible={true}
              />
            )
          }

            <div className="portfolio_filter">
              <Tabs>
              <TabList>
                  <Tab onClick={() => handleTabChange('All')}>All</Tab>
                  <Tab onClick={() => handleTabChange('Mobile Application')}>Mobile</Tab>
                  <Tab onClick={() => handleTabChange('Web Application')}>Web</Tab>
                  <Tab onClick={() => handleTabChange('Machine Learning')}>ML</Tab>
                  <Tab onClick={() => handleTabChange('UI/UX')}>UI/UX</Tab>
                  <Tab onClick={() => handleTabChange('Branding')}>Branding</Tab>
              </TabList>
                {/* END TABLIST */}
                <div className="list_wrapper">
                {categories.map((index) => (
                  <TabPanel key={index}>
                  <ul className="portfolio_list">
                    {filteredProjects.map((item, index) => (
                      <li key={index} data-aos="fade-right" data-aos-duration="1200">
                        <div className="inner">
                          <div className="entry tokyo_tm_portfolio_animation_wrap">
                            <img
                              src={`${process.env.REACT_APP_API_URL}${item.image.data.attributes.url}`} 
                              alt={item.title}
                              data-tip
                              data-for={`tooltip-${index}`}
                              loading="lazy"
                              onClick={(e) => toggleModal(e, item.details, item.images)} 
                            />
                            <ReactTooltip
                              id={`tooltip-${index}`}
                              place="bottom"
                              type="light"
                              effect="float"
                              className="tooltip-wrapper"
                            >
                              <div>
                                <h5>{item.title}</h5>
                                <span>{item.category}</span>
                              </div>
                            </ReactTooltip>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                    
                    {/* END PORTFOLIO LIST */}
                  </TabPanel>
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
                        <img src="assets/img/svg/cancel.svg" alt="close icon" />
                      </button>
                      {/* END CLOSE ICON */}
                      <div className="box_inner">
                        <div className="description_wrap scrollable">
                        
                          {/* <div className="details">
                  
                              <p className="date">
                                By <a href="#">Anupama Dilshan</a>
                                <span>05 April 2021</span>
                              </p>
                            </div>
                          </div> */}
                          {/* END DETAILS */}
                          <div className="main_content ">
                            <div className="descriptions">
                            <ReactMarkdown children={currentArticle && currentArticle.replace(/\n/gi, "\n")}>
                              {currentArticle}
                            </ReactMarkdown>
                            <br/>
                                            {/* START IMAGE CONTAINER */}
                            <div className="image-container">
                              {images && images.map(image => (
                                <img
                                  key={image.id}
                                  src={`${process.env.REACT_APP_API_URL}${image.attributes.url}`} // Adjust the URL as needed
                                  alt={image.attributes.name}
                                  className="modal-image"
                                />
                              ))}
                            </div>
                            {/* END IMAGE CONTAINER */}
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

          
                </div>
                {/* END LIST WRAPPER */}
              </Tabs>
            </div>
          </div>
        </div>
      </Gallery>

    </>
  );
};

export default Portfolio;
