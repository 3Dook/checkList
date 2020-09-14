import React from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component"
import home from "./components/home.component"
import findCheckList from "./components/findCheckList.component"
import createCheckList from "./components/createCheckList.component"
import editCheckList from "./components/editCheckList.component"
import aboutMe from "./components/aboutMe.component"

function App() {
  return (
      <Router>
        <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={home}/>
        <Route path="/find" component={findCheckList}/>
        <Route path="/create" component={createCheckList}/>
        <Route path="/edit/:id" component={editCheckList}/>
        <Route path="/aboutMe" component={aboutMe}/>
        </div>
      </Router>
  );
}

export default App;
