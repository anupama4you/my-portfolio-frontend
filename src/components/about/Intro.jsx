import React from "react";

const Intro = () => {
  const introContent = {
    image: "assets/img/slider/group_pic.gif",
    name: "Anupama Dilshan",
    designation: "Fullstack Developer",
    text: (
      <>
       <p>
  Hello! I'm <span className="special_texts">PUMA ;)</span> a proud alumnus of the 
  <span className="special_texts"> University of Adelaide</span>, 
  and a <span className="special_texts">globally-experienced software engineer</span>. 
  With a versatile background stretching from Sri Lanka to Egypt and now Adelaide, 
  I bring over <span className="special_texts">three years of diverse experience </span> 
  in the tech world. I've honed my skills in <span className="special_texts">full-stack development</span>, 
  specializing in technologies like <span className="special_texts">React.js, Node.js, Express.js, Laravel</span>, 
  <span className="special_texts"> HTML5</span>, <span className="special_texts"> CSS</span>, 
  <span className="special_texts"> PHP</span>, <span className="special_texts"> Bootstrap</span>, 
  <span className="special_texts"> MySQL</span>, and <span className="special_texts">Adobe XD</span>.
</p>

<p>
  My journey has been marked by pivotal roles, such as leading the development of a comprehensive 
  <span className="special_texts"> ERP system at IFS Sri Lanka</span>, and single-handedly crafting 
  both web and mobile-responsive platforms for a major company in Egypt. 
  In Adelaide, I continued to excel at <span className="special_texts">Savvy</span>, 
  enhancing business operations systems using <span className="special_texts">Salesforce</span>, 
  <span className="special_texts">Apex</span>, and <span className="special_texts">JavaScript</span>. 
  My freelancing and startup experiences have sharpened my abilities in 
  <span className="special_texts">innovation and client satisfaction</span>, 
  fueling my passion for transforming ideas into impactful applications.
</p>

<p>
  Beyond technical prowess, my leadership skills were polished through roles in 
  <span className="special_texts">international organizations like AIESEC</span>, 
  complementing my technical skills with effective team management. 
  My academic journey was no less remarkable, achieving 
  <span className="special_texts">9th country rank in the GCE A/L exams</span> 
  and being the <span className="special_texts">top performer</span> in my school. 
  I'm not just a developer; I'm an <span className="special_texts">innovative creator</span> 
  and a <span className="special_texts">dedicated professional</span>, 
  eagerly looking for opportunities to bring technological visions to life.
</p>

      </>
    ),
  };

  return (
    <>
      <div className="top_author_image">
        <img src={introContent.image} alt="about" className="black-and-white"/>
      </div>
      <div className="about_title">
        <h3>{introContent.name}</h3>
        <span>{introContent.designation}</span>
      </div>
      <div className="about_text">{introContent.text}</div>
    </>
  );
};

export default Intro;
