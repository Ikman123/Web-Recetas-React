import './styles.css';
import { useState } from 'react';
import Pildora from './pildora';

function CreatePills() {
    const [desc, setDesc] = useState('');
    const [pills, setPills] = useState([]);
    const [cant, setCant] = useState(1);

    function cambios(e) {
        e.preventDefault();
        if (desc.trim() !== '') {
        const pillsCant = `${cant} ${desc}`;
        setPills([...pills, pillsCant]);
        setDesc('');
        }
    }

    function eliminarPildora(index) {
        const nuevasPills = pills.filter((_, i) => i !== index);
        setPills(nuevasPills);
    }

    return (
        <>
        <form onSubmit={cambios}>
            <br></br>
            <span><h2>Ingrese el alimento que quiere usar para su receta</h2></span>
            <input
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            ></input>
            
            <select
            onChange={(e) => setCant(parseInt(e.target.value))}
            value={cant}
            >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            </select>
            
            <button type="submit">Ingresar alimento</button>
        </form>
        <div className='container'>
            <div className="pildora-container">
                {pills.map((pildora, index) => (
                <Pildora
                    key={index}
                    text={pildora}
                    onDelete={() => eliminarPildora(index)}
                />
                ))}
            </div>
        </div>
        </>
    );
}

export default CreatePills;
