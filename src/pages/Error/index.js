import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Error(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2>Página não encontrada!</h2>
            <Link to="/">Voltar para a Home</Link>
        </div>
    )
}