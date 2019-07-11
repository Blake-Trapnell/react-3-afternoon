import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import { ToastContainer, toast } from 'react-toastify'
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`)
    .then(res=> {
      this.setState({ posts: res.data });
      toast.succes(`Hello`)
    })
    .catch(()=>{
      toast.error(`im in trouble`)
    })

  }

  updatePost(id, text ) {
    console.log(`helloworld`)
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(res=> {
      toast.success('woot posted')
      this.setState({ posts: res.data })
    })
    .catch(()=> {
      toast.error(`ah Shit`)
    })
  }

  deletePost() {

  }

  createPost() {

  }
  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          
          {
            posts.map( post => (
              <Post key={ post.id } 
                    text={ post.text }
                    date={ post.date } 
                    id= { post.id }
                    updatePostfn={ this.updatePost} />
            ))
          }

        </section>
      </div>
    );
  }
}

export default App;