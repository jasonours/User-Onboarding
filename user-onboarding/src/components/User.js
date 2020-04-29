import React from "react";

const User = props => {
  console.log("User props", props.user);
  return (
    <div className="userContainer">
      {props.user.map(user => {
        return (
          <div className="userCard">
            <p>User: {user.data.name}</p>
            <p>Email: {user.data.email}</p>
            <p>Password: {user.data.password}</p>
            <p>Position: {user.data.positions}</p>
            <p>Terms: {user.data.terms}</p>
          </div>
        );
      })}
    </div>
  );
};

export default User;