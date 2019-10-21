import React,{Component} from 'react';
//import logo from './logo.svg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Particles from 'react-particles-js';
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
      imageURL:''
    }
  }
  onInputChange = (event)=>{
      this.setState({value:event.target.value})
  }
  onButtonPress = ()=>{
    this.setState({imageURL:this.state.value})
    //console.log("click");
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
       this.state.value).then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
  }

  render(){
    return (
      <div className="App">
      <Particles className = 'particles'
      params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonPress={this.onButtonPress}/>
        <FaceDetection URL = {this.state.imageURL} />
      </div>
    );
  }
  
}

export default App;
