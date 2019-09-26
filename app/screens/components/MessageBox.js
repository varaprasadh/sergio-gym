import React, { Component } from 'react'
import styles from "./styles/messagebox.css";

export default class MessageBox extends Component {
    render() {
        return (
            <div className={styles.container}>
               {this.props.children || <div className={styles.message}>{this.props.message}</div> }
            </div>
        )
    }
}
