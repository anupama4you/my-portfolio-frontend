import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Map from "./Map";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import Social, { SocialShare } from "./Social";

const Contact = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form.current);
    const data = {};

    // Convert form data to a plain object
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const requestData = {
      data: {
        name: data['name'], 
        email: data['email'], 
        message: data['message']
      }
    };
    

    try {
      // Make a POST request
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contacts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
        },
        body: JSON.stringify(requestData), 
      });

      if (response.ok) {
        toast.success("Message Sent Successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Clear the form
        form.current.reset();
      } else {
        throw new Error("Message Not Sent");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ops Message Not Sent!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // const SocialShare = [
  //   {
  //     iconName: "facebook",
  //     link: "https://www.facebook.com/anupama.dilshanw?mibextid=LQQJ4d",
  //   },
  //   {
  //     iconName: "instagram",
  //     link: "https://instagram.com/anupama4you",
  //   },
  //   { iconName: "linkedin", link: "https://www.linkedin.com/in/anupama-dilshan/" },
  // ];

  return (
    <>
      <div className="container">
        <div className="tokyo_tm_contact">
          <div className="tokyo_tm_title">
            <div className="title_flex">
              <div className="left">
                <span>Contact</span>
                <h3>Let's talk</h3>
              </div>
            </div>
          </div>
          {/* END TITLE */}

          <div className="top_author_image">
            <img src="./assets/img/intro/contact.jpg" className="contact_image" alt=""/>
            {SocialShare.map((val, i) => (
              <span key={i} className={`social_btn${i}`}>
                <a href={`${val.link}`} className="animate__pulse" target="_blank" rel="noreferrer">
                  <img
                    className="svg"
                    src={`/assets/img/svg/social/${val.iconName}.svg`}
                    alt="social"
                  ></img>
                </a>
              </span>
          ))} 
          </div>
          {/* MENU WRAP */}

          <div className="fields">
            <form
              className="contact_form"
              id="myForm"
              ref={form}
              onSubmit={sendEmail}
            >
              <div className="first">
                <ul>
                  <li>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                    />
                  </li>
                  {/* END FIRST NAME */}

                  <li>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </li>
                  {/* END EMAIL */}

                  <li>
                    <textarea
                      name="message"
                      placeholder="Message"
                      required
                    ></textarea>
                  </li>
                  
                  {/* END SUBJECT MESSAGE */}
                </ul>
              </div>
              <div className="tokyo_tm_button">
                <button type="submit" className="ib-button">
                  Send Message
                </button>

              </div>
              
            </form>
            {/* END FORM */}
          </div>
          {/* END FIELDS */}
        </div>
      </div>
      {/* END COTACT */}
    </>
  );
};

export default Contact;
