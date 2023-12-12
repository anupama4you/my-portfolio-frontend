import React from "react";

export const SocialShare = [
  { iconName: "linkedin", link: "https://www.linkedin.com/in/anupama-dilshan/" },
  { iconName: "github", link: "https://github.com/anupama4you" },
  {
    iconName: "facebook",
    link: "https://www.facebook.com/anupama.dilshanw",
  },
  // { iconName: "twitter", link: "#" },
  {
    iconName: "instagram",
    link: "https://instagram.com/anupama4you?igshid=OGQ5ZDc2ODk2ZA==",
  },
  {
    iconName: "tik-tok",
    link: "https://www.tiktok.com/@anupama_dilshan?_t=8i3iIUZwc5J&_r=1",
  },
];
const Social = () => {
  return (
    <>
      <ul className="social">
        {SocialShare.map((val, i) => (
          <li key={i}>
            <a href={`${val.link}`} target="_blank" rel="noreferrer">
              <img
                className="svg"
                src={`/assets/img/svg/social/${val.iconName}.svg`}
                alt="social"
              ></img>
            </a>
          </li>
        ))}
      </ul>
      {/* END SOCIAL */}
    </>
  );
};

export default Social;
