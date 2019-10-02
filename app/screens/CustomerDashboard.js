import React, { Component } from 'react'

import styles from "./styles/customerdashboard.css";
import MessageBox from './components/MessageBox';
import RegisterClient from './components/RegisterClient';
import icon from "./images/running.svg";

export default class CustomerDashboard extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.header_icon}>
                       <img src={icon} alt="icon"/>
                       <div className={styles.title}>Imperium Fitness GYM</div>
                    </div>
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

