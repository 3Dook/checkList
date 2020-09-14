import React, { Component } from 'react';

export default class aboutMe extends Component {
  render() {
    return (
        <div>
        <div>
          <h1>ABOUT ME</h1>
          <p>Welcome to a CRUD APP for managing checklist.</p>
          <p>My overall goal for this application to is develop a simple platform 
          to create and update and eventually share checklist. The objectives of this first project
          is to learn the MERN stack and developing a CRUD application. This application was 
          created using 'npx create-react-app' and bootstrap for css.
          </p>
          <p>Some of my projects next steps are as follows:
            <ul>
              <li>Finish Cleaning up webpages</li>
              <li>Complete Search Query</li>
              <li>Add a delete button to checkList column</li>
              <li>Home directory - sort list of checklist by date</li>
            </ul>
          </p>
          <p>
            Thank you! 
          </p>
        </div>
        </div>
    );
  }
}