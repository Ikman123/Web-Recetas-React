import { useState } from 'react';
import './styles.css'
import Pildora from './pildora';

function CreatePills() {
    const [desc, setDesc] = useState('');
    const [pildoras, setPildoras] = useState([]);
    const [cantidad, setCantidad] = useState(1);

    function cambios(e) {
        e.preventDefault();
        if (desc.trim() !== '') {
            const pildoraConCantidad = `${cantidad} ${desc}`;
            setPildoras([...pildoras, pildoraConCantidad]);
            setDesc('');
        }
    }

    function eliminarPildora(index) {
        const nuevasPildoras = pildoras.filter((_, i) => i !== index);
        setPildoras(nuevasPildoras);
    }

    return (
        <>
            <form onSubmit={cambios}>
            <br></br>
            <span>hola</span>
            <input
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
            ></input>
            
            <select
                onChange={(e) => setCantidad(parseInt(e.target.value))}
                value={cantidad}
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            
            <button type="submit">Agregar píldora</button>
            </form>
    
            <div>
            {pildoras.map((pildora, index) => (
                <Pildora
                key={index}
                text={pildora}
                onDelete={() => eliminarPildora(index)} // Proporcionar función para eliminar
                />
            ))}
            </div>
        </>
    );
}

export default CreatePills;