import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextAarea from "react-validation/build/textarea";
import { Row, Col, Button } from 'react-bootstrap';
import { AiOutlineCloseCircle, AiOutlineDelete, AiOutlineDeleteColumn, AiOutlineUserDelete } from "react-icons/ai";




const Profile = (props) => {
  const form = useRef();
  const currentUser = AuthService.getCurrentUser();
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [educationlevel, setEducationLevel] = useState(null);
  const [workexperience, setWorkExperience] = useState(null);
  const [technicalknowledge, setTechnicalknowledge] = useState(null);
  const [cvattachment, setCvattachment] = useState(null);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  useEffect(() => {
    async function getUserDetails() {
        const userData = await UserService.getUserDetails(currentUser.username);
        setFirstName(userData.data.firstname);
        setLastName(userData.data.lastname);
        setEmail (userData.data.email);
        setAddress(userData.data.address)
        setEducationLevel (userData.data.educationlevel);
        setWorkExperience (userData.data.workexperience);
        setTechnicalknowledge (userData.data.technicalknowledge);
        setCvattachment (userData.data.cvattachment);
    }
    getUserDetails();

 }, [])

  
  const onChangeFirstName = (e) => {
    const firstname = e.target.value;
    setFirstName(firstname);
  };

  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastName (lastname);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail (email);
  };

  const onChangeAddress= (e) => {
    const address = e.target.value;
    setAddress (address);
  };

  const onChangeEducationLevel= (e) => {
    const educationlevel = e.target.value;
    setEducationLevel (educationlevel);
  };

  const onChangeWorkExperience= (e) => {
    const workexperience = e.target.value;
    setWorkExperience (workexperience);
  };

  const onChangeTechnicalknowledge= (e) => {
    const technicalknowledge = e.target.value;
    setTechnicalknowledge (technicalknowledge);
  };

  const onChangeCvattachment= (e) => {
    const cvattachment = e.target.value;
    setCvattachment (cvattachment);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    UserService.updateProfile(
      currentUser.username, 
      firstname,
      lastname,
      email,
      address,
      educationlevel,
      workexperience,
      technicalknowledge,
      cvattachment
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
      <h3 className="mt-2 mb-3">My Profile</h3>
      <div className="card mt-2 p-0" >
      <div className="card-header">
      <h5 className="card-title">Username: <strong>{currentUser.username}</strong></h5>
      </div>
      <Form onSubmit={handleSubmit} ref={form}>
      <div className="card-body">
          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstname"
                  onChange={onChangeFirstName}
                  value={firstname || ""}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastname"
                  onChange={onChangeLastName}
                  value={lastname || ""}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  onChange={onChangeEmail}
                  value={email || ""}
                />
              </div>
            </Col>
          </Row>


          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Input
                  type="text"
                  className="form-control"
                  name="address"
                  onChange={onChangeAddress}
                  value={address || ""}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="educationlevel">Education Level</label>
                <Input
                  type="text"
                  className="form-control"
                  name="educationlevel"
                  onChange={onChangeEducationLevel}
                  value={educationlevel || ""}
                />
              </div>
            </Col>
          </Row>


          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="workexperience">Work Experience</label>
                <TextAarea
                  className="form-control"
                  name="workexperience"
                  onChange={onChangeWorkExperience}
                  value={workexperience || ""}

                />

              </div>
            </Col>

          </Row>

          <Row>

            <Col>
              <div className="form-group">
                <label htmlFor="technicalknowledge">Technical Knowledge</label>
                <TextAarea
                  className="form-control"
                  name="technicalknowledge"
                  onChange={onChangeTechnicalknowledge}
                  value={technicalknowledge || ""}

                />
              </div>
            </Col>
          </Row>

          <Row>

            <Col>
              <div className="form-group">
                <label htmlFor="cvattachment">Attach CV</label>
                <Input
                  type="file"
                  className="form-control"
                  name="cvattachment"
                  
                />
              </div>
            </Col>
          </Row>
          </div>
          <div className=" card-footer ">
            <button className="btn btn-primary">Save</button>
          </div>

        {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success p-1 m-2" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}

      </Form>


      
    </div>

    {
  currentUser.roles.includes("ROLE_USER") && 
  <Button size="md" variant="outline-danger" className="ml-0 mb-2 mt-2" onClick={(e)=> alert('Delete profile ?')} ><AiOutlineDelete /> Delete Profile</Button>
}


    </div>






  );
};

export default Profile;
