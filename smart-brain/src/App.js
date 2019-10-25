import React,{Component} from 'react';
//import logo from './logo.svg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Particles from 'react-particles-js';
import SignInForm from './components/SignInForm/SignInForm.js';
import Register from './components/Register/Register.js';
import './App.css';
import Clarifai from 'clarifai';
//import { exportDefaultSpecifier } from '@babel/types';

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
      route : 'signin',
      isSignedin:false,
      userinfo : {
        id : '',
        name: '',
        email: '',
        entries: 0,
        date: ''
    }
    }
  }
  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //   .then(response=>response.json())
  //   .then(console.log);
  // }
  loadUser = (data)=>{
    this.setState({ userinfo:{
      id : data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      date: data.date
  }});
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
       .then(response=> {
        if(response){
          fetch('http://localhost:3000/image',{
            method:'put',
            headers:{'Content-Type':'appilcation/json'},
            body: JSON.stringify({
              id:this.state.userinfo.id
            })
          }).then(response => response.json())
          .then(count=>{
            console.log(count);
            this.setState(Object.assign(this.state.userinfo,{entries : count}));
          })
          
        } 
        return this.displayFace(this.calculateFaceLocation(response));
       })
      .catch(error=> console.log(error));
  }

  onRouteChange = (rout)=>{
    if(rout === 'signin'){
      this.setState({isSignedin:false})
    }else if(rout === 'home'){
      this.setState({isSignedin:true})
    }
    this.setState({route: rout});
  }

  render(){
    return (
      <div className="App">
      <Particles className = 'particles'
      params={particlesOptions} />
        <Navigation onRouteChange = {this.onRouteChange} isSignedin = {this.state.isSignedin} />
        {   this.state.route === 'home'?
            <div>
                <Logo />
                <Rank name = {this.state.userinfo.name} entries ={this.state.userinfo.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonPress={this.onButtonPress}/>
                <FaceDetection URL = {this.state.imageURL} box = {this.state.box} />
            </div>
            :(
                this.state.route === 'signin'?
                <SignInForm loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
                :<Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
            )
        }       
      </div>
    );  
}
}

export default App;
