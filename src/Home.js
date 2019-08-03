import React from 'react';
import './Home.css'

export default class Home extends React.Component {
    render() {
        return (
        <div className="Home">
            <header className="Home-header">
                Hi, I'm Luke Kennedy.<br/>
                I write code for fun and profit.<br/>
                <a href="https://www.github.com/LLKennedy">Here's my Github!</a>
            </header>
        </div>)
    }
}