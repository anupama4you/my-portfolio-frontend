import React, {useState, useEffect} from "react";
import FunFact from "./FunFact";
import Partners from "./Partners";
import Pricing from "./Pricing";
import Services from "./Services";
import Testimonial from "../about/Testimonial";
import { RotatingLines } from "react-loader-spinner";

const ServiceMain = () => {
  const [servicesData, setservicesData] = useState(false);
  const [testimonialData, settestimonialData] = useState(false);

  return (
    <>
      {/* SERVICE */}

      <div className="container">
        <div className="tokyo_tm_services">
          <div className="tokyo_tm_title">
            <div className="title_flex">
              <div className="left">
                <span>Services</span>
                <h3>What I Do</h3>
              </div>
            </div>
          </div>
          {/* End tokyo_tm_title */}

          <div className="center-spinner">
          {
            !servicesData && (
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="300"
                visible={true}
              />
            )
          }
          </div>

          <div className="list">
              <ul>
                <Services setservicesData={setservicesData} />
              </ul>
          </div>
          
          {/* End list */}
        </div>
      </div>
      {/* End .container */}

      {/* <div className="tokyo_tm_partners">
        <div className="container">
          <div className="tokyo_section_title">
            <h3>Partners</h3>
          </div>
          <div className="partners_inner">
            <ul>
              <Partners />
            </ul>
          </div>
        </div>
      </div> */}
      {/* End partners */}

      <div className="tokyo_tm_testimonials">
        <div className="container">
          <div className="tokyo_section_title">
            <h3>Testimonials</h3>
          </div>
          <div className="center-spinner">
          {
            !testimonialData && (
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="300"
                visible={true}
              />
            )
          }
          </div>
          <div className="list">
            <Testimonial settestimonialData={settestimonialData} />
          </div>
        </div>
      </div>

      <div className="tokyo_tm_facts">
        <div className="container">
          <div className="tokyo_section_title">
            <h3>Fun Facts</h3>
          </div>
          <div className="list">
            <ul>
              <FunFact />
            </ul>
          </div>
        </div>
      </div>
      {/* End funfacts */}
{/* 
      <div className="tokyo_tm_pricing">
        <div className="container">
          <div className="tokyo_section_title">
            <h3>Pricing</h3>
          </div>
          <div className="list">
            <ul>
              <Pricing />
            </ul>
          </div>
        </div>
      </div> */}
      {/* End pricing */}

      {/* /SERVICE */}
    </>
  );
};

export default ServiceMain;
