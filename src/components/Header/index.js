import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Header() {
  return (
    <header>
      <Link className="title" to="/">Rick and Morty Characters</Link>
    </header>
  );
}