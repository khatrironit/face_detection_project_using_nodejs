import React from 'react';
import './ImageLinkForm.css';

function ImageLinkForm({onInputChange,onButtonPress}){
    return (
        <div>
            <p className = 'f3'>
                {'This Magic Brain will detect faces in your pictures.Give it a try!!'}
            </p>
            <div className='center' >
                <div className = 'form center pa4 br2 shadow-5'>
                    <input onChange = {onInputChange} className = 'pa2 f4 w-70 center ' type = 'text' placeholder = 'enter URL'></input>
                    <button onClick = {onButtonPress} className = 'f4 pa2 w-30 grow link white bg-light-purple dib ph3 pv2'>
                        Detect
                    </button>
                </div>
                
            </div>
            
                
        </div>
    );
}

export default ImageLinkForm;