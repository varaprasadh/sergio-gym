import React, { Component } from 'react'
import styles from "./styles/header.css";
import icon from "./images/running.svg";


export class Header extends Component {
    render() {
        return (
            <div>
                 <div className={styles.header}>
                    <div className={styles.header_icon}>
                       <img src={icon} alt="icon"/>
                       <div className={styles.title}>Imperium Fitness GYM</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
