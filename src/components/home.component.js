import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import checkList from '../../backEnd/models/checkList';


const CheckListHolder = props => (
  <div>
    <table className="table  table-bordered table-condensed thead-light">
      <thead>
        <tr>
          <th>TITLE</th>
          <td>
            {props.check.title}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>DESCRIPTION</th>
          <td>
            {props.check.description}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)

const CheckListColumn = props => (
  <div style={{position: 'fixed', marginRight: '10%'}}>
    <table style={{width: '100%'}} className="table table-bordered table-hover table-dark">
      <thead></thead>
      <tbody>
      <tr>
          <th>TITLE</th>
          <td>
            {props.data.title}
          </td>
        </tr>
        <tr>
          <th>DESCRIPTION</th>
          <td>
            {props.data.description}
          </td>
        </tr>
        <tr>
          <td><Link to={"/edit/"+props.data._id}>VIEW</Link></td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default class home extends Component {
  constructor(props){
    super(props);

    this.state={
      checkList: [],
      column: []
    };
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/all')
      .then(response =>{
        this.setState({checkList: response.data})
        this.setState({column: response.data[0]})
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

  contentColumn(){
    if(this.state.column){
      return <CheckListColumn data={this.state.column}/>
    }
  }

  handleContent(id){
    //onsole.log(event.target.value) //undefined
    console.log(id)
    axios.get('http://localhost:5000/api/'+id)
      .then(response =>{
        this.setState({column: response.data.data})
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {

    return (
      <div> 
        <div>
          <h1>HOME</h1>
          <p>Welcome to a CRUD APP for managing checklist.</p>
        </div>
        <div className="container">
          <div className="row" >
            <div className="col-md-6 col-sm-6">
              {this.contentTable()} 
            </div>
            <div className="col-md-6 col-sm-6">
              {this.contentColumn()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}