import React, { Component } from 'react';
import axios from 'axios';


export default class editCheckList extends Component {
    constructor(props){
    super(props);
    
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.handleChangeItem = this.handleChangeItem.bind(this);
	this.handleChangeItemChecked = this.handleChangeItemChecked.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleDelete = this.handleDelete.bind(this);
    this.state={
      user: '',
      title: '',
      description: '',
      date: '',
      rating: '',
      itemList: [],
      tags: [],
      checkList: [],
      id: '',
    };
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/'+this.props.match.params.id)
      .then(response =>{
        //console.log(response.data)
        //note to self. response.data.data due to actual data package being nested.
        this.setState({
          user: response.data.data.user,
          title: response.data.data.title,
          description: response.data.data.description,
          date: response.data.data.dateCreated,
          rating: response.data.data.rating,
          itemList: response.data.data.itemList,
          tags: response.data.data.tags,
          id: response.data.data._id,
          checkList: response.data})
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleChangeTitle(e){
    this.setState({
      title: e.target.value
    })
  }
  handleChangeDescription(e){
    this.setState({
      description: e.target.value
    })
  }
  //below are functions for dynamically adding items to our check list
  createItemInput(){
    return this.state.itemList.map((el, i) =>
    <div key={i}>
	  <input type="checkbox" name="checked" checked={el.checked} onChange={e => this.handleChangeItemChecked(e, i)}/>
      <input type="text" required placeholder={"item#"+(i+1)} value={el.name || ''}  onChange={ e => this.handleChangeItem( e, i)}/>
      <input type="button" className="btn btn-danger btn-sm" value="X" onClick={this.removeClickItem.bind(this,i)}/>
    </div>)
  }

  handleChangeItemChecked(event, idx){
    let temp = this.state.itemList.slice();
    temp[idx].checked = !temp[idx].checked;
    this.setState({itemList: temp});
  }

  handleChangeItem(event, idx){
    let temp = this.state.itemList.slice();
    temp[idx].name = event.target.value;
    this.setState({itemList: temp});
  }
  
  removeClickItem(i){
    let itemList = [...this.state.itemList];
    itemList.splice(i,1);
    this.setState({itemList});
  }

  addItem(){
    //console.log(" adding tag - something")
    let tempArray = this.state.itemList;
    tempArray.push({name:"", checked: false})
    this.setState({itemList: tempArray})
    //console.log(this.state.tags)
  }
  /* THIS SERIES OF FUNCTION IS USE TO MAINTIAN  and edit TAGS LIST */
  createTagInput(){
    return this.state.tags.map((el, i)=>
    <div key={i}>
      <input type="button" value="X" className="btn btn-danger btn-sm" onClick={this.removeClick.bind(this,i)}/>
      <input type="text" required placeholder={"tag#"+(i+1)} value={el || ''}  onChange={ e => this.handleChangeTag( e, i)}/>
    </div>)
  }

  handleChangeTag(event, idx){
    let temp = this.state.tags.slice();
    temp[idx] = event.target.value;
    this.setState({tags: temp});
  }

  addTag(){
    //console.log(" adding tag - something")
    let tempArray = this.state.tags;
    tempArray.push((""))
    this.setState({tags: tempArray})
    //console.log(this.state.tags)
  }

  removeClick(i){
    let tags = [...this.state.tags];
    tags.splice(i,1);
    this.setState({tags});
  }

  handleDelete(id){

    axios.delete('http://localhost:5000/api/delete/'+this.state.id)
      .then(res => {
        console.log(res.data)
        window.location = '/';
      })
      .catch(err => {
        console.log(err)
      })
      
  }

  handleSubmit(e){
    e.preventDefault();
    axios.put('http://localhost:5000/api/' + this.props.match.params.id, this.state)
      .then(res => {
        console.log(res.data)
        window.location = '/'
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    //TODO: CONDITIONAL RENDERING
    console.log(this.state)
    let foundCheckList;
    if(this.state.checkList.length === 0){
      foundCheckList = "UNABLE TO FIND CHECK LIST";
    } else{
      foundCheckList = "FOUND CHECKLIST";
    }
   
    return (
        <div>
            <p>You are in edit CheckList</p>
            <div>
             {foundCheckList} 
            </div>
            <div>
              <h3>EDIT CHECK LIST {this.state.title}</h3>
              <form onSubmit={this.handleSubmit}>
                <table className="table table-bordered">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td><label>TITLE:</label></td>
                      <td>
                        <input type="text" required
                        className="form-control"
                        value={this.state.title}
                        onChange={this.handleChangeTitle}/>
                      </td>
                    </tr>
                    <tr>
                      <td><label>DESCRIPTION</label></td>
                      <td>
                      <textarea rows="3" cols="60"
                        required
                        className="form-control"
                        placeholder="ENTER DESCRIPTION"
                        value={this.state.description}
                        onChange={this.handleChangeDescription}/>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                      <div >
                        {this.createItemInput()}
                        <input type="button" className="btn btn-success" value="ADD ITEM" onClick={this.addItem.bind(this)}/>
                      </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div>
                        {this.createTagInput()}
                        <input type="button" className="btn btn-success" value="ADD TAGS" onClick={this.addTag.bind(this)}/>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>            
                <div className="form-group">
                  <input type="submit" value="CONFIRM EDIT" className="btn btn-primary" />
                  <input type="button" className="btn btn-secondary" value="Delete Checklist" onClick={() => this.handleDelete(this.state.id)}/>
                </div>
              </form>
            </div>
        </div>
    );
  }
}