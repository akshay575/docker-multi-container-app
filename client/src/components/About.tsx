import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component<any, any> {
    render() {
        return (
            <div>
                <h2>About Us</h2>
            <p>Hi, this is a about page!</p>
            <Link to="/">Go back home</Link>
            </div>
        );
    }
}

export default About;