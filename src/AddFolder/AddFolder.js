import React from 'react';
import ApiContext from '../ApiContext';
import ValidateError from '../ValidateError/ValidateError'

//need name input and addfolder button

export default class AddFolder extends React.Component {
  constructor(props){
    super(props)
      this.state={
        name: '',
        validMessage: '',
        validError: false
      }
    }
  
  static contextType=ApiContext;

  validateFolder(input){
    let errMessage=this.state.validMessage;
    let hasError = false;

    input = input.trim();
    if(input.length === 0){
      errMessage = 'Folder name is required'
      hasError=true;
    }
    else if(input.length < 3){
      errMessage = 'Folder name must be at least 3 characters'
      hasError=true;
    }
    else {
      errMessage= ''
      hasError=false;
    }
    this.setState({
      validMessage: errMessage,
      validError: hasError
    })
  }
  

  addFolderRequest (name, addFolder){
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name: name})
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

  updateTitle = (name) => {
    this.setState({name: name}, ()=> {this.validateFolder(name)})
  }

  render() {
    const { addFolder } = this.context;
    this.handleSubmit = (e) => {
      e.preventDefault();
      this.addFolderRequest(this.state.name, addFolder)
    }
    
    return(
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label htmlFor="add-folder">Create a Folder</label>
          <input id="add-folder" type="text" onChange={
            (e) => this.updateTitle(e.target.value)
          }></input>
          {<ValidateError hasError={!this.state.validError} message={this.state.validMessage}/>}
        <button type="submit">Add Folder</button>
        
      </form>
    )
  }
}