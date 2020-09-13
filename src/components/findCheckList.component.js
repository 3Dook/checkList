
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import checkList from '../../backEnd/models/checkList';


const CheckListHolder = props => (
  <div>
    <table className="table  table-bordered">
      <tbody>
        <tr>
          <th>TITLE</th>
          <td>
            {props.check.title}
          </td>
        </tr>
        <tr>
          <th>DESCRIPTION</th>
          <td>
            {props.check.description}
          </td>
        </tr>
        <tr>
          <td colSpan='2'><Link to={"/edit/"+props.check._id}>VIEW</Link></td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default class findCheckList extends Component {
  constructor(props){
    super(props);

    this.state={
      checkList: []
    };
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/all')
      .then(response =>{
        this.setState({checkList: response.data})
      })
      .catch(error => {
        console.log(error);
      });
  }

  contentTable(){
    return this.state.checkList.map(idx =>{
      return <CheckListHolder check={idx} key={idx._id}/>;
    })
  }

  render() {
    return (
      <div> 
        <div>
          <p>You are on the find ALL PAGE </p>
        </div>
        <div>
         {this.contentTable()}
        </div>
      </div>
    );
  }
}