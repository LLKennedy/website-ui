import React from 'react';
import './Detail.css'

const DetailsText = "I'm a software developer and systems integrator. I have experience designing, implementing, maintaining, operating and upgrading software for its entire lifecycle."
const DetailsText2 = "I enjoy sci-fi and fantasy novels, the entire audiovisual aesthetic of Synthwave/Vaporwave, and thought provoking or artistic video games such as Outer Wilds, Riven, KSP and Transistor."

export default class Detail extends React.Component {
    render() {
        return (
            <div className="Detail">
                <span className="Detail-basics">
                    <header className="Detail-text">
                        {DetailsText}
                    </header>
                    <br />
                    <header className="Detail-text">
                        {DetailsText2}
                    </header>
                </span>
            </div>
        )
    }
}