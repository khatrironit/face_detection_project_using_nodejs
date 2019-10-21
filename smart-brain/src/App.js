import React,{Component} from 'react';
//import logo from './logo.svg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Particles from 'react-particles-js';
import SignInForm from './components/SignInForm/SignInForm.js';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App ({
  apiKey : '315e2150065d47c9adfdc55fd2aecc90'
});

const particlesOptions = {
    particles:{
      number:{
        value:100,
        density:{
          enable:true,
          value_area:800
        }
      }
    }
};

class App extends Component {
  constructor(){
    super()
    this.state = {
      value:'',
      imageURL:'',
      box:'',
      route : 'signin'
    }
  }
  calculateFaceLocation = (data)=>{
      const claraiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);
     // console.log(width, height);
     return {
       leftcol : claraiFace.left_col * width,
       toprow : claraiFace.top_row * height,
       rightcol : width - (claraiFace.right_col * width),
       bottomrow : height - (claraiFace.bottom_row * height)
     };
      
  }
  displayFace = (box)=>{
    //console.log(box);
    this.setState({box: box});

  }
  onInputChange = (event)=>{
      this.setState({value:event.target.value})
  }
  onButtonPress = ()=>{
    this.setState({imageURL:this.state.value})
    //console.log("click");
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
       this.state.value)
       .then(response=> this.displayFace(this.calculateFaceLocation(response)))
      .catch(error=> console.log(error));
  }

  onRouteChange = (route)=>{
    this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
      <Particles className = 'particles'
      params={particlesOptions} />
        <Navigation onRouteChange = {this.onRouteChange} />
        {   this.state.route === 'signin'?<SignInForm onRouteChange = {this.onRouteChange} />
            :<div>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonPress={this.onButtonPress}/>
                <FaceDetection URL = {this.state.imageURL} box = {this.state.box} />
            </div>
            
        }
        
      </div>
    );
  }
  
}

export default App;
