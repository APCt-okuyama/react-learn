import React from "react";

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ProfileData = (props) => {
    console.log(props.graphData);

    return (
        <div id="profile-div">
            {/* <p><strong>First Name: </strong> {props.graphData.givenName}</p>
            <p><strong>Last Name: </strong> {props.graphData.surname}</p>
            <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {props.graphData.id}</p> */}
            <p><strong>First Name: </strong> test test </p>
            <p><strong>Last Name: </strong> test </p>
            <p><strong>Email: </strong> test@email.com </p>
            <p><strong>Id: </strong> xxxx </p>            
        </div>
    );
};