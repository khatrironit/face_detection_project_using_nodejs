import React from 'react';
//import './ImageLinkForm.css';

function Rank({name,entries}){
    return (
        <div>
            <div className = 'white f3'>
                {`Hey ${name},Your rank is... `}
            </div>
            <div className = 'white f1'>
                {`${entries}`}
            </div>
        </div>
    );
}

export default Rank;