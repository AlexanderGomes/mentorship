import React from "react";
import "./Project.css";
import { FaShare } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";

const Project = () => {
  return (
    <div className="project__main">
      <h2 className="project__h2">Projects</h2>
      <div className="project__card">
        <div className="project__top">
          <h1>Daycare</h1>
        </div>
        <div className="icons">
          <a className="project__btn" href="">
            Show Project <FaShare />{" "}
          </a>

          <div className="blue__icon plus">
            <GrAdd/>
          </div>
          <div className="blue__icon">
            <AiFillEdit />
          </div>
        </div>
        <p className="project__desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
          commodi saepe magnam eius pariatur officiis ipsam deleniti numquam
          nesciunt alias nihil repellat doloribus corporis voluptatem nisi,
          asperiores possimus accusamus ratione.
        </p>
      </div>
      <div className="project__card">
        <h1>Daycare</h1>
        <a className="project__btn" href="">
          Show Project <FaShare />{" "}
        </a>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
          commodi saepe magnam eius pariatur officiis ipsam deleniti numquam
          nesciunt alias nihil repellat doloribus corporis voluptatem nisi,
          asperiores possimus accusamus ratione.
        </p>
      </div>
      <div className="project__card">
        <h1>Daycare</h1>
        <a className="project__btn" href="">
          Show Project <FaShare />{" "}
        </a>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
          commodi saepe magnam eius pariatur officiis ipsam deleniti numquam
          nesciunt alias nihil repellat doloribus corporis voluptatem nisi,
          asperiores possimus accusamus ratione.
        </p>
      </div>
    </div>
  );
};

export default Project;
