import React, { useState, useEffect, useRef } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Tabs, Tab, Button} from 'react-bootstrap';
import Table from './Table';
import { AiOutlinePlus } from 'react-icons/ai';
import { useHistory } from "react-router-dom";

function BoardAdmin () {
  const [content, setContent] = useState("");
  const [candidates, setCandidates] = useState([]);

  function handleCandidatesUpdate(newValue) {
    setCandidates(newValue);
  }

  const candidatesRef = useRef();
  candidatesRef.current = candidates;

  const [moderators, setModerators] = useState([]);

  function handleModeratesUpdate(newValue) {
    setModerators(newValue);
  }

  const moderatorsRef = useRef();
  moderatorsRef.current = moderators;

   const schema = {
    "id": "",
    "firstname": "",
    "lastname": "",
    "email": ""
  }
  let history = useHistory();

  useEffect(() => {
    UserService.getAdminBoard().then(
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

    UserService.getCandidates().then(
      (response) => {
        handleCandidatesUpdate(response.data);
        //console.log(JSON.stringify(response))
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          handleCandidatesUpdate(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    UserService.getModerators().then(
      (response) => {
        handleModeratesUpdate(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          handleModeratesUpdate(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    )
    

  }, []);

  return (
    <div>
      <h3 className="mt-2">{content}</h3>

      <Tab.Container id="left-tabs-example" defaultActiveKey="Candidates">
      <Button className="primary ml-0 mb-2 mt-2" onClick={(e)=> {e.preventDefault(); history.push('/createuser')}} ><AiOutlinePlus /> Create User</Button>


<Tabs
  defaultActiveKey="candidates"
  transition={false}
  id="noanim-tab-example"
  className="mb-3"
>
  <Tab eventKey="candidates" title="Candidates">
  <Table headers={Object.keys(schema)} type="candidate" mode="admin" onUpdate={handleCandidatesUpdate} rows={candidates} />
  </Tab>
  <Tab eventKey="moderators" title="Moderators">
  <Table headers={Object.keys(schema)} type="mod" mode="admin" onUpdate={handleModeratesUpdate} rows={moderators} />
  </Tab>

</Tabs>

</Tab.Container>


    </div>
  );
};

export default BoardAdmin;
