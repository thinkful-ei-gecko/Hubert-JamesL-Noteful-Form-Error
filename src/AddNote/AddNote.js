import React from 'react';
import ApiContext from '../ApiContext'
import ValidateError from '../ValidateError/ValidateError'
//import './NotefulForm/NotefulForm.css'

export default class AddNote extends React.Component {
  static contextType = ApiContext;

  state = {
    noteName: '',
    noteContent: '',
    noteFolder: '',
    folderId: ''
  }
  
  updateName(name) {
    this.setState({noteName: name})
  };

  updateContent = (content) => {
    this.setState({noteContent: content})
  };

  updateFolder = (folder) => {
    this.setState({noteFolder: folder})
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
      Promise.reject('You have an error!')
    })
    .then(data => console.log(addNote(data)))
  }

  validateName() {

  };

  render() {
    const {name, content} = this.state;
    const {addNote} = this.context;
    this.handleSubmit = (e) => {
      e.preventDefault();
      this.handleSubmitNote(name, content, this.context.folders.find((folder) => folder.name === this.state.noteFolder).id, addNote)
    }

    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='note-id'>Name: </label>
          <input 
            id='note-id'
            onChange={(e) => this.updateName(e.target.value)}
          >
          </input>
          <label htmlFor='note-content'>Content: </label>
          <input 
          id='note-content'
          onChange={(e) => this.updateContent(e.target.value)}
          >
          </input>
          <label htmlFor='note-folder'>Folder: </label>
          <input 
            id='note-folder'
          onChange={(e) => this.updateFolder(e.target.value)}
          >
          </input>
          <button type='submit'>Add Note</button>
        </form>
      </div>
    )
  }
}