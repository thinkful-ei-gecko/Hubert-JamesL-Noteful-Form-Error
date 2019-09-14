import React from 'react';
import propTypes from 'prop-types'

export default class ErrorMain extends React.Component {
  state = {hasError: false};
  static getDerivedStateFromError(error){
    console.error(error);
    return {
      hasError: true 
    }
  }
  render(){
    if(this.state.hasError){
      return (
        <main className="error-page">
          <h1>Whoops: Looks like something went wrong!</h1>
          <p>Please try refreshing</p>
        </main>
      )
    }
    return this.props.children
  }
}

ErrorMain.propTypes = {
  children: propTypes.object.isRequired
}