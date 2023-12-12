import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  var settings = {
    dots: false,
    arrow: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "${process.env.REACT_APP_API_URL}/api/testimonials?populate=*",
        {
          headers: {
            Authorization:
              `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchData().then((data) => {
      setTestimonials(data["data"]);
      console.log(testimonials);
    });
  }, []);

  const testimonialContent = testimonials.map((service, index) => {
    return {
      id: service.id,
      text: service.attributes.comment,
      avatar: service.attributes.avatar,
      name: service.attributes.name,
      designation: service.attributes.designation,
    };
  });

  // const testimonialContent = [
  //   {
  //     id: 1,
  //     text: `Beautiful minimalist design and great, fast response with
  //     support. Highly recommend. Thanks Marketify!`,
  //     avatar: "url(assets/img/testimonials/1.jpg)",
  //     name: "Alexander Walker",
  //     designation: "Graphic Designer",
  //   },
  //   {
  //     id: 2,
  //     text: `Beautiful minimalist design and great, fast response with
  //     support. Highly recommend. Thanks Marketify!`,
  //     avatar: "url(assets/img/testimonials/2.jpg)",
  //     name: "Isabelle Smith",
  //     designation: "Content Manager",
  //   },
  //   {
  //     id: 3,
  //     text: `Beautiful minimalist design and great, fast response with
  //     support. Highly recommend. Thanks Marketify!`,
  //     avatar: "url(assets/img/testimonials/3.jpg)",
  //     name: "Baraka Clinton",
  //     designation: "English Teacher",
  //   },
  // ];

  return (
    <ul className="testimonila-slider-wrapper">
      <Slider {...settings} arrows={false}>
        {testimonialContent.map((item) => (
          <li key={item.id}>
            <div className="list_inner">
              <div className="text">
                <p>{item.text}</p>
              </div>
              <div className="details">
                <div className="image">
                  <div
                    className="main"
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_API_URL}${item.avatar.data.attributes.url})`,
                    }}
                  />
                </div>
                <div className="info">
                  <h3>{item.name}</h3>
                  <span>{item.designation}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </Slider>
    </ul>
  );
};

export default Testimonial;
