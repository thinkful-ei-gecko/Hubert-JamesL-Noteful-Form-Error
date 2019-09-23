import React from 'react';
import ApiContext from '../ApiContext';
import ValidateError from '../ValidateError/ValidateError'

//need name input and addfolder button

export default class AddFolder extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        name: {
          value: '',
          touched: false
        },
      }
    }
  
  static contextType =ApiContext;

  validateFolder(){
    let name = this.state.name.value.trim();

    if(name.length === 0){
      return 'Folder name is required'
    }
    else if(name.length < 3){
      return 'Folder name must be at least 3 characters'
    }
  }
  

  addFolderRequest (name, addFolder){
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name})
    })
    .then(res => {
      if(res.ok){
        return res.json()
      }
      Promise.reject('Something went wrong')
    })
    .then(data => addFolder(data))
    .catch(err => console.log(err))
  }

  updateTitle = (val) => {
    this.setState({
      name: {
        value: val.target.value,
        touched: true
      }
    })
  }

  render() {
    const { addFolder } = this.context;
    this.handleSubmit = (e) => {
      e.preventDefault();
      if (!this.state.validError) {
        this.addFolderRequest(this.state.name.value, addFolder)
      }
    }
    
    return(
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label htmlFor="add-folder">Create a Folder</label>
          <input 
            id="add-folder"
            type="text"
            onChange={(e) => this.updateTitle(e)}
            value={this.state.name.value}>
            </input>
          {this.state.name.touched && <ValidateError message={this.validateFolder()}/>}
        <button 
          type="submit"
          onClick={() => this.props.history.goBack()}
          disabled={this.validateFolder()}>
          Add Folder
        </button>
      </form>
    )
  }
}
