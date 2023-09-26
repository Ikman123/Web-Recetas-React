import React from 'react';
import './styles.css'

function Pildora({ text, onDelete }) {
    return (
        <div className="pildora">
        {text}
        <span className="delete-icon" onClick={onDelete}>
            &#x2715;
        </span>
        </div>
    );
}

export default Pildora;
