import React from 'react';
import ApiContext from '../ApiContext'
import ValidateError from '../ValidateError/ValidateError'
import '../NotefulForm/NotefulForm.css'
import PropTypes from 'prop-types'

export default class AddNote extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      noteName: {
        value: '',
        touched: false
      },
      noteContent: {
        value: '',
        touched: false
      },
      noteFolder: {
        value: '',
        touched: false
      },
      folderId: '',
    }
  }
  static contextType = ApiContext;
  
  updateName(name) {
    this.setState({ noteName: { value: name.target.value, touched: true} });
  };

  updateContent = (content) => {
    this.setState({noteContent: { value: content.target.value, touched: true}})
  };

  updateFolder = (folder) => {
    this.setState({noteFolder: { value: folder.target.value, touched: true}})
  }

  validateNoteName(){
    let name = this.state.noteName.value.trim();
    if (name.length === 0) {
      return 'Please enter more than 1 character';
    }
    if(name.length<3){
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

  handleSubmitNote = (e) => {
    e.preventDefault();
    const newData = {
      name: this.state.noteName.value,
      content: this.state.noteContent.value,
      folderId: this.state.noteFolder.value,
      modified: new Date()
    }
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject('You have an error!')
    })
    .then(data => this.context.addNote(data))
    .catch(e => console.log(e.message))
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const {noteName, noteContent} = this.state;
  //   const {addNote} = this.context;
  //   this.handleSubmitNote(noteName, noteContent, this.context.folders.find((folder) => folder.name === this.state.noteFolder).id, addNote)
  // }


  render() {
    const nameError = this.validateNoteName();
    const contentError = this.validateNoteContent();
    const folderError = this.validateNoteFolder();
    const {folders} = this.context;

    return (
      <div>
        <form onSubmit={e => this.handleSubmitNote(e)}>
          <label htmlFor='note-id'>Name: </label>
          <input 
            id='note-id'
            onChange={(e) => this.updateName(e)}
            value={this.state.noteName.value}
            required
          >
          </input>
          <ValidateError message={nameError} />

          <label htmlFor='note-content'>Content: </label>
          <input 
            id='note-content'
            onChange={(e) => this.updateContent(e)}
            value={this.state.noteContent.value}
            required
          >
          </input>
          <ValidateError message={contentError} />

          {/* <label htmlFor='note-folder'>Folder: </label>
          <input 
            id='note-folder'
            onChange={(e) => this.updateFolder(e.target.value)}
            required
          >
          </input> */}
          <select
            name="folder-select"
            value={this.state.noteFolder.value}
            onChange={e => this.updateFolder(e)}>
            <option 
              key=""
              value="">
              Select Folder
            </option>
              {folders.map(folder => {
                return (<option key={folder.id} value={folder.id}> {folder.name} </option>)})
              }
          </select>
          <ValidateError message={folderError} />
          <button
            type='submit'
            onClick={() => this.props.history.goBack()}
            disabled={nameError || folderError}
          > Add Note
          </button>
        </form>
        
      </div>
    )
  }
}

