import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <p>Route not found.</p>
            <Link to="/">Go home</Link>
        </div>
    )
}

export default NotFound;