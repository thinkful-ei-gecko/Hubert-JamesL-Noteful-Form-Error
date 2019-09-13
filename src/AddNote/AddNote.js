import React from 'react';
import ApiContext from '../ApiContext'
import ValidateError from '../ValidateError/ValidateError'
//import './NotefulForm/NotefulForm.css'

export default class AddNote extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      noteName: '',
      noteContent: '',
      noteFolder: '',
      folderId: '',
      validMessage: '',
      validError: false
    }
  }
  static contextType = ApiContext;
  
  updateName(name) {
    name = name.trim();
    this.setState({noteName: name})
  };

  updateContent = (content) => {
    content = content.trim();
    this.setState({noteContent: content})
  };

  updateFolder = (folder) => {
    this.setState({noteFolder: folder})
  }

  validateNoteName(){
    // let errMessage = this.state.validMessage;
    // let hasError=false;

    
    if(this.state.noteName.length<3){
      return 'Please enter a name that is at least 3 characters long';
      // hasError=true
    }
    // else {
    //   this.state.validMessage='';
    //   // hasError=false;
    // }
    // this.setState({
    //   validMessage: errMessage,
    //   validError: !hasError
    // })
  }

  validateNoteContent(){
    // let errMessage = this.state.validMessage;
    // let hasError=false;

    if(this.state.noteContent.length<3){
      return 'Please enter content that is at least 3 characters long';
      // hasError=true
    }
    // else {
    //   errMessage='';
    //   hasError=false;
    // }
    // this.setState({
    //   validMessage: errMessage,
    //   validError: !hasError
    // })
  }

  handleSubmitNote = (name, content, folderId, addNote) => {
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({name: name, content: content, folderId: folderId})
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject('You have an error!')
    })
    .then(data => addNote(data))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {noteName, noteContent} = this.state;
    const {addNote} = this.context;
    this.handleSubmitNote(noteName, noteContent, this.context.folders.find((folder) => folder.name === this.state.noteFolder).id, addNote)
  }


  render() {
    const nameError = this.validateNoteName();
    const contentError = this.validateNoteContent();
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='note-id'>Name: </label>
          <input 
            id='note-id'
            onChange={(e) => this.updateName(e.target.value)}
          >
          </input>
          <ValidateError message={nameError} />

          <label htmlFor='note-content'>Content: </label>
          <input 
            id='note-content'
            onChange={(e) => this.updateContent(e.target.value)}
          >
          </input>
          <ValidateError message={contentError} />

          <label htmlFor='note-folder'>Folder: </label>
          <input 
            id='note-folder'
            onChange={(e) => this.updateFolder(e.target.value)}
          >
          </input>

          <button type='submit' >Add Note</button>
        </form>
        
      </div>
    )
  }
}