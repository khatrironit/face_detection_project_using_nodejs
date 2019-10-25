import React from 'react';
import 'tachyons';
//import { spreadElement } from '@babel/types';

class SignInForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password: ''
        };
    }

    onEmailChange = (event)=>{
        //console.log(event.target.value);
        this.setState({email : event.target.value});
    }
    onPasswordChange = (event)=>{
        this.setState({password : event.target.value});
    }
    onSubmit = ()=>{
        //return console.log(this.state);
        fetch('http://localhost:3000/signin', {
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                email : this.state.email,
                password : this.state.password
            })
        }).then(response =>response.json())
        .then(response =>{
            if(response === 'success'){
                this.props.loadUser(response);
                this.props.onRouteChange('home');
            }
        })
       //this.props.onRouteChange('home');
    }
    
    render(){
        return (
            <div>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">   
                    <main className="pa4 black-80">
                        <form className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange = {this.onEmailChange} ></input>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange = {this.onPasswordChange} >

                                    </input>
                                </div>
                            </fieldset>
                            <div className="">
                                <p  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                        type="submit" 
                                        // {value="Sign in"}
                                        onClick = {this.onSubmit}
                                        
                                         >sign in                                        
                                        </p>
                            </div>
                            <div className="lh-copy mt3">
                                <p className="f6 link dim black db pointer" 
                                onClick = {()=>this.props.onRouteChange('register')}
                                >Register</p>
                            </div>
                        </form>
                    </main>
                </article>
    
            </div>
        );
    }
    
}

export default SignInForm;