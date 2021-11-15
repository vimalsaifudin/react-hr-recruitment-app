import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
  <div className="card">
  <div className="card-header">
  <h3 className="mt-2">{content}</h3>
  </div>
  <div className="card-body">
    <h5 className="card-title">Application Developer</h5>
    <p className="card-text">Job Description</p>
    <a href="#" className="btn btn-primary">Apply Now</a>
  </div>
</div>



  );
};

export default BoardUser;
