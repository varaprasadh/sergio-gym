import React, { Component } from 'react'
import styles from "./styles/missioncontrol.css";
import GymActionSlider from '../components/GymActionSlider';

export class MissionControl extends Component {
    constructor(props){
        super(props);
        this.state={
            total_clients:'123',
            active_clients:'12',
            inactive_clients:'45',
        }
    }

    render() {
        return (
            <div className={styles.container}>
              <GymActionSlider/>
              <div className={styles.stats}>
                  <div className={styles.state_box+" "+styles.total}>
                      <div className={styles.stat_number}>
                          {this.state.total_clients}
                      </div>
                      <div className={styles.stat_info}>
                          Total clients
                      </div>
                  </div>
                  <div className={styles.state_box+" "+styles.active}>
                      <div className={styles.stat_number}>
                         {this.state.active_clients}
                      </div>
                      <div className={styles.stat_info}>
                          Active clients
                      </div>
                  </div>
                  <div className={styles.state_box+" "+styles.inactive}>
                      <div className={styles.stat_number}>
                           {this.state.inactive_clients}
                      </div>
                      <div className={styles.stat_info}>
                          In Active clients
                      </div>
                  </div>

              </div>     
            </div>
        )
    }
}

export default MissionControl
