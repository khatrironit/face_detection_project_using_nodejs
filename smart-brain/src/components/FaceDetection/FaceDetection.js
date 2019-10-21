import React from 'react';
import 'tachyons';
function FaceDetection({URL}){
    return (
        <div className = 'center ma'>
            <div className = 'absolute mt2'>
                <img alt = '' src = {URL} width = '500px' height = 'auto'></img>
            </div>
            
        </div>

    );
}

export default FaceDetection;