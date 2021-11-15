import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

import {Image} from 'react-bootstrap';

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
    <div className="mt-3" >
      <h3 className="p-0">{content}</h3>
    <Image fluid src="./rag-doll-lined-up-one-red-through-magnifying-glass.jpg" />
  </div>

  </div>
  );
};

export default Home;
