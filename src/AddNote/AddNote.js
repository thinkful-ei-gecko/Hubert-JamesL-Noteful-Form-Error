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
    if(this.state.noteName.length<3){
      return 'Please enter a name that is at least 3 characters long';
    }
  }

  validateNoteContent(){
    if(this.state.noteContent.length<3){
      return 'Please enter content that is at least 3 characters long';
    }
  }

  validateNoteFolder() {
    if(!this.state.noteFolder) {
      return 'Folder name is required'
    } else {
      return null
    }
  }

  handleSubmitNote = (name, content, folderId, addNote) => {
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({name: name, content: content, folderId: folderId, modified: new Date()})
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
    const folderError = this.validateNoteFolder();
    const {folderSelect} = this.context;

    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='note-id'>Name: </label>
          <input 
            id='note-id'
            onChange={(e) => this.updateName(e.target.value)}
            required
          >
          </input>
          <ValidateError message={nameError} />

          <label htmlFor='note-content'>Content: </label>
          <input 
            id='note-content'
            onChange={(e) => this.updateContent(e.target.value)}
            required
          >
          </input>
          <ValidateError message={contentError} />

          <label htmlFor='note-folder'>Folder: </label>
          <input 
            id='note-folder'
            onChange={(e) => this.updateFolder(e.target.value)}
            required
          >
          </input>
          <select
            name="folder-select"
            value={this.state.folderId}
            onChange={e => this.updateFolder(e.target.value)}>
            <option 
              key=""
              value={null}>
              Select Folder
            </option>
              {folderSelect.map(folder => <option key={folder.id} value={folder.id}> {folder.name} </option>)}
          </select>
          <ValidateError message={folderError} />
          <button
            type='submit'
            onClick={() => this.props.history.goBack()}
            disabled={nameError || contentError || folderError}
          > Add Note
          </button>
        </form>
        
      </div>
    )
  }
}