import React from 'react';

function Pill({ text, onDelete }) {
    return (
        <div className="pill">
        {text}
        <button onClick={() => onDelete(text)}>X</button>
        </div>
    );
}

export default Pill;