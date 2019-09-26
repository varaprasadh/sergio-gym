import React, { Component } from 'react'
import styles from "./styles/registerclient.css";

export default class RegisterClient extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.model}> 
                    <div className={styles.card}>
                    <div className={styles.title}>Register</div>
                    <div className={styles.input_group}>
                        <input type="text" placeholder="First Name"/>
                    </div>
                    <div className={styles.input_group}>
                        <input type="text" placeholder="Last Name"/>
                    </div>
                    <div className={styles.input_group}>
                        <input type="number" placeholder="Mobile"/>
                    </div>
                    <div className={styles.input_group}>
                        <input type="text" placeholder="DNI"/>
                    </div>    
                    <div className={styles.gender}>
                        <div className={styles.row}>
                            <div><input type="radio" name="gender" id="male"/></div><label for="male">Male</label>
                        </div>
                        <div className={styles.row}>
                            <div><input type="radio" name="gender" id="female"/></div><label for="female">Female</label>                     
                        </div>
                    </div>    
                        <a className={styles.submit}>submit</a>
                    </div>
                </div>
            </div>
        )
    }
}
