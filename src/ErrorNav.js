import React from 'react';
import propTypes from 'prop-types'

export default class ErrorNav extends React.Component {
  state = {hasError: null};
  static getDerivedStateFromError(error){
    console.error(error);
    this.setState({
      hasError: true
    })
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

ErrorNav.propTypes = {
  children: propTypes.object.isRequired
}