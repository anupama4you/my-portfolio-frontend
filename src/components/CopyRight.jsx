import React from "react";

const CopyRight = () => {
  return (
    <div className="copyright">
      <p>
        &copy; {new Date().getFullYear()} copyrights <br /> Developed by
        <a
          href="#"
          rel="noreferrer"
        >
          Anupama Dilshan
        </a>
      </p>
    </div>
  );
};

export default CopyRight;
