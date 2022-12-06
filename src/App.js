import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation'
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo'
import Rank from './Components/Rank/Rank'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Particles from './Components/Particles/Particles'
import './App.css';
import 'tachyons';



const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  } 
  calculateFaceLocation = (response) => {
    const face = response.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputImage');
     const width = Number(image.width);
     const height = Number(image.height);
     return {
      leftCol : face.left_col * width,
      topRow : face.top_row * height,
      rightCol : width - (face.right_col * width),
      bottomRow : height - (face.bottom_row * height)
     }
  }
  displayFace = (box) => {
    this.setState({box : box})
  }
  onInputChange= (event) => {
    this.setState({input : event.target.value})
  }
  onButtonClick = () => {
    this.setState({imageUrl : this.state.input})
    fetch('https://smartface-brainyapp.fly.dev/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: this.state.input })
    }).then(response => response.json())
      .then( response => {
        if(response) {
          fetch('https://smartface-brainyapp.fly.dev/image', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({id: this.state.user.id})
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, count ))
          })
          .catch(console.log)
        }
          this.displayFace(this.calculateFaceLocation(response))     
      })
      .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isSignedIn : true})
    }else if (route === "signin"){
      this.setState(initialState)
    }
    this.setState({route : route});
  }




  render () {
    const {isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">
        <Particles />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
        ? <div>
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm 
           onInputChange={this.onInputChange}
           onButtonClick={this.onButtonClick}
        />
        <FaceRecognition box={box} imageUrl={imageUrl} />
      </div>
        : (
          route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
      }
      </div>
    );
  }
}

export default App;
