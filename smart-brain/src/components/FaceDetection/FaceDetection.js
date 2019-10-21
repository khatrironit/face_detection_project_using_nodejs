import React from 'react';
import 'tachyons';
import './FaceDetection.css'
function FaceDetection({URL , box}){
    return (
        <div className = 'center ma'>
            <div className = 'absolute mt2'>
                <img id = 'inputImage' alt = '' src = {URL} width = '500px' height = 'auto'></img>
                <div className = 'bounding-box' style = {{top:box.toprow, left:box.leftcol, right:box.rightcol, bottom:box.bottomrow}}></div>
            </div>
            
        </div>

    );
}

export default FaceDetection;