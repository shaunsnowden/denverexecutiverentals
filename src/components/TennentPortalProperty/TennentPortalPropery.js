import React, { Component } from 'react';
import axios from 'axios';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import style from './styles/style.css';



class TennentPortalProperty extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('/api/tennentproperty')
      .then((response) => {
        console.log(response.data);
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="TennentPortalProperty">
        <CreatePost onSubmit={this.handleNewPostSubmit} onChange={this.handleInputChange} />
        <hr />
        {this.state.posts.map((post) => {
          return (
            <Post postData={post} />
          )
        })}
      </div>
    );
  }
}

export default TennentPortalProperty;
