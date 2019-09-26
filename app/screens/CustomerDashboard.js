import React, { Component } from 'react'

import styles from "./styles/customerdashboard.css";
import MessageBox from './components/MessageBox';
import RegisterClient from './components/RegisterClient';

export default class CustomerDashboard extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    logo & title
                </div>
                <div className={styles.main_wrapper}>
                    <div className={styles.sidebar}>
                        <div className={styles.action}>
                            Register client
                        </div>
                        <div className={styles.action}>
                            Clients
                        </div>
                    </div>
                    <div className={styles.control_area}>
                        {/* <MessageBox message="testing"/> */}
                        <RegisterClient/>
                    </div>
                </div>
            </div>
        )
    }
}

