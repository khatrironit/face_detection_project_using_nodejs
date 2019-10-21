import React from 'react';
import 'tachyons';

function SignInForm({onRouteChange}){
    return (
        <div>
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">   
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" type="email">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"></input>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" type="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"></input>
                            </div>
                        </fieldset>
                        <div className="">
                            <input  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Sign in"
                                    onClick = {()=>onRouteChange('home')} >                                        
                                    </input>
                        </div>
                        <div className="lh-copy mt3">
                            <a href="#0" className="f6 link dim black db">Register</a>
                        </div>
                    </form>
                </main>
            </article>

        </div>
    );
}

export default SignInForm;