import React, { Component } from 'react'

import styles from "./styles/svg_background.css";
import mountains from "./images/Flat_Mountains.svg";

export class SVGBackground extends Component {
    render() {
        let isFront=this.props.isFront?{zIndex:0}:{};
        return (
            <div className={styles.container}>
                <img src={mountains} alt="mountains" style={isFront} className={styles.bgimg}/>
                {this.props.children}
            </div>
        )
    }
}

export default SVGBackground
