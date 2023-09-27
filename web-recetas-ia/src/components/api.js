import React, { useState } from 'react';
import './styles.css'

function EdamamApiComponent() {
    const [app_id, setAppId] = useState('');
    const [app_key, setAppKey] = useState('');
    const [recipe, setRecipe] = useState('');
    const [response, setResponse] = useState('');
    let XDomainRequest

    const createCORSRequest = (method, url) => {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
        } else if (typeof XDomainRequest !== "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
        } else {
        xhr = null;
        }
        return xhr;
    }

    const makeCorsRequest = () => {
        const url = `https://api.edamam.com/api/nutrition-details?app_id=${app_id}&app_key=${app_key}`;
        var xhr = createCORSRequest('POST', url);

        if (!xhr) {
        alert('CORS not supported');
        return;
        }
        xhr.onload = () => {
        var text = xhr.responseText;
        setResponse(text);
        };

        xhr.onerror = () => {
        alert('Woops, there was an error making the request.');
        };

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(recipe);
    }

    return (
        <>
            <div className='api-container'>
                <div className='label-api'>
                <label htmlFor="app_id"><h4>API ID:</h4></label>
                <input type="text" name="app_id" id="app_id" onChange={(e) => setAppId(e.target.value)} value={app_id} />
                <br />
                <label htmlFor="app_key"><h4>API KEY:</h4></label>
                <input type="text" name="app_key" id="app_key" onChange={(e) => setAppKey(e.target.value)} value={app_key} />
                </div>
                <br />
                <textarea
                    id="recipe"
                    rows="20"
                    cols="80"
                    onChange={(e) => setRecipe(e.target.value)}
                    value={recipe}
                >
                </textarea>
                <br />
                <button type="button" onClick={makeCorsRequest}>Enviar</button>
                <hr /> Respuesta:
                <br />
                <pre>{response}</pre>
            </div>
        </>
    );
}

export default EdamamApiComponent;
