import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
      <header>
        <Link className="title" to="/">Rick and Morty Characters</Link>
      </header>
    );
  }