import React from 'react';

export default class ErrorPage extends React.Component {
  state = {haseError: null};
  static getDerivedStateFromError(error){
    console.error(error);
    this.setState({
      hasError: error 
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