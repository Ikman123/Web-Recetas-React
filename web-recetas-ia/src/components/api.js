import React, { useEffect, useState } from 'react';
import Pill from './elimPills';

function ApiEdamam() {
        const [selectRegion, setSelectRegion] = useState([]);
        const [selectComida, setSelectComida] = useState([]);
        const [recipes, setRecipes] = useState([]);
        const appId = '2f7148c9';
        const appKey = '8d59f01513e9895548477e6d3b083897';
        const apiUrl = `https://api.edamam.com/search?q=${selectRegion.join(',')}&dishType=${selectComida.join(',')}&app_id=${appId}&app_key=${appKey}`;

    
        useEffect(() => {
        if (selectRegion || selectComida) {
            fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                throw new Error(`La solicitud falló con estado: ${response.status}`);
                }
                return response.json();
            })
            .then((responseData) => {
                const limitedRecipes = responseData.hits.slice(0, 2);
                setRecipes(limitedRecipes);
            })
            .catch((error) => {
                console.error('Hubo un error al hacer la solicitud:', error);
            });
        }
        }, [selectRegion , selectComida]);

        const handleRegionChange = (event) => {
            const region = event.target.value;
            if (!selectRegion.includes(region)) {
                setSelectRegion([...selectRegion, region]);
            }
        };
        
        const handleDishTypeChange = (event) => {
            const comida = event.target.value;
            if (!selectComida.includes(comida)) {
                setSelectComida([...selectComida, comida]);
            }
        };
    
        const handleDeleteRegion = (region) => {
            const updatedRegions = selectRegion.filter((r) => r !== region);
            setSelectRegion(updatedRegions);
        };
        
        const handleDeleteDishType = (comida) => {
            const updatedDishTypes = selectComida.filter((d) => d !== comida);
            setSelectComida(updatedDishTypes);
        };
        
        return (
        <>
            <h1>Busca una receta segun tus gustos</h1>
            <select value={selectRegion} onChange={handleRegionChange}>
                <option value="">Selecciona una región</option>
                <option value="Italian">Italiana</option>
                <option value="Mexican">Mexicana</option>
                <option value="Indian">India</option>
                <option value="Asian">Asian</option>
            </select>
            <select value={selectComida} onChange={handleDishTypeChange}>
                <option value="">Selecciona un tipo de alimento</option>
                <option value="Pizza">Pizza</option>
                <option value="Pasta">Pasta</option>
                <option value="Salad">Ensalada</option>
            </select>

            <div className="pills-container">
            {selectRegion.map((region) => (
                <Pill key={region} text={region} onDelete={handleDeleteRegion} />
            ))}
            {selectComida.map((comida) => (
                <Pill key={comida} text={comida} onDelete={handleDeleteDishType} />
            ))}
            </div>

            <ul>
            {recipes.map((recipe) => (
            <li key={recipe.recipe.label}>
                <h2>{recipe.recipe.label}</h2>
                <ul>
                {recipe.recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.text}</li>
                ))}
                </ul>
            </li>
            ))}
        </ul>
        </>
        );
}

export default ApiEdamam;
