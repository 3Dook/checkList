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

// eslint-disable-next-line
/*
const checkListColumn = props => (
  <div>
    <table className="table table-bordered">
      <thead></thead>
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
*/
export default class home extends Component {
  constructor(props){
    super(props);

    this.state={
      checkList: [],
      column: {
        title: '',
        description: '',
        itemList: [],
        tags: []
      }
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
      return (
      <div onClick={() => this.handleContent(idx._id)} value={idx._id} key={idx._id}>
        <CheckListHolder check={idx} key={idx._id}/>
      </div>
      )
    })
  }

  handleContent(event, idx){
    //onsole.log(event.target.value) //undefined
    console.log(event)
  }
  render() {
    return (
      <div> 
        <div>
          <h1>HOME</h1>
          <p>Welcome to a CRUD APP for managing checklist.</p>
        </div>
        <div >
            {this.contentTable()}
        </div>
      </div>
    );
  }
}