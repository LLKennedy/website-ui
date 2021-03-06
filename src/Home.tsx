import React from 'react';
import './Home.css'
// import Detail from './Detail';
import Technologies from './Technologies';

export default class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <header className="Home-header">
                    Hi, I'm Luke Kennedy.<br />
                    I write code for fun and profit.<br />
                    <a href="https://www.github.com/LLKennedy" className="Home-link">Here's my Github!</a>
                    You can also keep scrolling for more about me.
                </header>
                <Technologies />
            </div>
        )
    }
}