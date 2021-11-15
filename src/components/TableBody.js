import React, {useState, useRef} from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextAarea from "react-validation/build/textarea";
import UserService from "../services/user.service";

const TableBody = ({onUpdate, type, mode, ...rest}) => {
  const { headers, rows } = rest;
  const columns = headers ? headers.length : 0;
  const showSpinner = rows === null;
  const [modalEditUserShow, setEditUserModalShow] = React.useState(false);
  const [modalResetPasswordShow, setPasswordChangeModalShow] = React.useState(false);

  const form = useRef();
  const [username, setUsername] = useState(null);
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [address, setAddress] = useState(null);
  const [educationlevel, setEducationLevel] = useState(null);
  const [workexperience, setWorkExperience] = useState(null);
  const [technicalknowledge, setTechnicalknowledge] = useState(null);
  const [cvattachment, setCvattachment] = useState(null);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  async function loadModalEditUser(username) {
        const userData = await UserService.getUserDetails(username);
        setUsername(username)
        setFirstName(userData.data.firstname);
        setLastName(userData.data.lastname);
        setEmail (userData.data.email);
        setAddress(userData.data.address)
        setEducationLevel (userData.data.educationlevel);
        setWorkExperience (userData.data.workexperience);
        setTechnicalknowledge (userData.data.technicalknowledge);
        setCvattachment (userData.data.cvattachment);
        setEditUserModalShow(true)
  }

  async function loadModalResetPassword(username) {
    setUsername(username)
    setPasswordChangeModalShow(true)
}

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    UserService.resetPassword(
      username, 
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

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    UserService.updateProfile(
      username, 
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
        refreshTable()
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

  const refreshTable = () => {
    switch (type) {
      case "candidate":
        UserService.getCandidates().then(
          (response) => {
            onUpdate(response.data);
          },
          (error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              onUpdate(_content);
          }
        );
        
        break;
      case "mod":
        UserService.getModerators().then(
          (response) => {
            onUpdate(response.data);
          },
          (error) => {
            const _content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              onUpdate(_content);
          }
        );
        
        break;
    
      default:
        break;
    }
  }

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

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  
  function buildRow(row, headers) {
    return (
         <tr key={row.id}>
         { headers.map((value, index) => {
             return <td key={index}>{row[value]}</td>
          })}
          <td>
            <Button variant="primary" size="sm" onClick={() => {loadModalEditUser(row['username'])} }>Edit</Button>
            {mode==="admin" && 
            <Button style={{marginLeft: '2px'}} variant="success" size="sm" onClick={()=>{loadModalResetPassword(row['username'])}}>Reset Password</Button>
            }
            {mode==="moderator" && 
            <Button style={{marginLeft: '2px'}} variant="success" size="sm" onClick={()=>{alert("Request More Information: "+row['username'])}}>Request More Information</Button>
            }
            {mode==="admin" &&
            <Button style={{marginLeft: '2px'}} variant="danger" size="sm" onClick={()=>{alert("Are you sure you want to delete the record "+row['username']+"?")}}>Delete</Button>
            }

          <Modal show={modalResetPasswordShow} onHide={() => setPasswordChangeModalShow(false)}
            size="lg"
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Username: <strong>{username}</strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handlePasswordChange} ref={form}>
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
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setPasswordChangeModalShow(false)}>Close</Button>
            </Modal.Footer>
          </Modal>






<Modal show={modalEditUserShow} onHide={() => setEditUserModalShow(false)}
        size="lg"
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Username: <strong>{username}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleUpdateUser} ref={form}>
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
            <button className="btn btn-primary">Submit</button>
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

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setEditUserModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>



          </td>
         </tr>
     )
  };

  return(
    <tbody>
        {showSpinner &&
          <tr key="spinner-0">
              <td colSpan={columns} className="text-center">
                  <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                  </div>
              </td>
          </tr>
          }
        { !showSpinner && rows && rows.map((value) => {
              return buildRow(value, headers);
          })}
    </tbody>
  );
}

export default TableBody;