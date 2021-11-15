import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";


const Side = props => {
const {currentUser, showAdminBoard, showModeratorBoard} = props;
    return (
        <>
            <Nav className="list-group list-group-flush">
                <Nav.Link className="list-group-item list-group-item-action list-group-item-light p-3" href="/home">Home</Nav.Link>
                {currentUser && 
                <>
                <Nav.Link className="list-group-item list-group-item-action list-group-item-light p-3" href="/profile" >Profile</Nav.Link>
                <Nav.Link className="list-group-item list-group-item-action list-group-item-light p-3" href="/resetpwd" >Reset Password</Nav.Link>
                </>
                }
                {showAdminBoard && (
                    <Nav.Link className="list-group-item list-group-item-action list-group-item-light p-3" href="/admin" >Admin Board</Nav.Link>
                )}
                {showModeratorBoard && (
                    <Nav.Link className="list-group-item list-group-item-action list-group-item-light p-3" href="/mod" >Moderator Board</Nav.Link>
                )}
            </Nav>

        </>
    );
};
const Sidebar = withRouter(Side);
export default Sidebar