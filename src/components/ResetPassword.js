import React, { useState, useRef } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Row, Col } from 'react-bootstrap';



const ResetPassword = (props) => {
  const form = useRef();
  const currentUser = AuthService.getCurrentUser();
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);



  
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

 


  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    UserService.resetPassword(
      currentUser.username, 
      password
      ).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );

  }

  return (
    <div>
      <h3 className="mt-2 mb-3">Reset Password</h3>
    
        <Form onSubmit={handleSubmit} ref={form}>
        <div className="card mt-2 p-0" style={{width: '500px', margin:'0'}}>
      <div className="card-body" >
          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={onChangePassword}
                  value={password || ""}
                />
              </div>
            </Col>
            </Row>
            <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="reenterpassword">Reenter Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="reenterpassword"
                />
              </div>
            </Col>
           
          </Row>
          </div>
          <div className="card-footer">
          <button className="btn btn-primary">Submit</button>
         


        {message && (
            <div className="form-group mt-3">
              <div
                className={
                  successful ? "alert alert-success p-1 mt-1" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
 </div>
    
    </div>
      </Form>



      
</div>
  );
};

export default ResetPassword;
