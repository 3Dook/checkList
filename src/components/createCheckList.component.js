import React, {Component } from 'react';
import axios from 'axios'

export default class createChecklist extends Component {
  
  constructor(props){
    super(props);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeItem = this.handleChangeItem.bind(this);
    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
    this.state = {
      title: '',
      description: '',
      itemList: [],
      tags: [],
      //user: '' //TODO: ADD USER OBJECT
    }
  };

  handleChangeTitle(event){
    this.setState({
      title: event.target.value
    })
  }
  handleChangeDescription(event){
    this.setState({
      description: event.target.value
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
  //Below are function for dynamically adding Tags input columns
  createTagInput(){
    return this.state.tags.map((el, i) =>
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

  handleSubmit(e){
    e.preventDefault();
    console.log(this.state);

    axios.post('http://localhost:5000/api/add', this.state)
      .then(response => {
        console.log(response.data)
        //reload window
        window.location ='/'
      })
      .catch(err => console.log(err))
    
  }  
  render() {
    return (
      <div>
        <div>
          <h3>CREATE A NEW CHECKLIST</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label>Title: </label>
                <input type="text"
                  required
                  className="form-control"
                  placeholder="TITLE NAME"
                  value={this.state.title}
                  onChange={this.handleChangeTitle}
                />
            </div>
            <div  className="form-group">
                <label>Description: </label>
                {/*
                <input type="markdown"
                  required
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleChangeDescription}
                />-->*/}
                <textarea rows="3" cols="60"
                  required
                  className="form-control"
                  placeholder="ENTER DESCRIPTION"
                  value={this.state.description}
                  onChange={this.handleChangeDescription}>
                  </textarea>
                
            </div>
            <div className="form-group">
              <div >
              {this.createItemInput()}
              <input type="button" className="btn btn-success" value="ADD ITEM" onClick={this.addItem.bind(this)}/>
              </div>
            </div> 
            <div className="form-group">
              <div>
              {this.createTagInput()}
              <input type="button" className="btn btn-success" value="ADD TAGS" onClick={this.addTag.bind(this)}/>
              </div>
            </div>
            <div className="form-group">
                <input type="submit" value="Create checkList" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}