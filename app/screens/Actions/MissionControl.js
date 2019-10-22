import React, { Component } from 'react'
import styles from "./styles/missioncontrol.css";
import GymActionSlider from '../components/GymActionSlider';
import { connection } from '../../dbhandler/connection';
const moment = require('moment');

export class MissionControl extends Component {
    constructor(props){
        super(props);
        this.state={
            total_clients:'',
            active_clients:'',
            inactive_clients:'',
        }
    }

    componentWillMount(){
       connection.query(`select * from clients`,(err,results)=>{
          if(err) console.log(err);
          this.setState({
              total_clients:results.length
          });
          let _clients=results;
          let _active=0;
          let activeClients=_clients.filter(({plan_acivated_date,plan})=>{
                    let planeActivated=moment(Number(plan_acivated_date+""));
                    planeActivated.add(plan,'month');
                    let isActive = planeActivated.isAfter(moment());
                    return isActive;
          });
         console.log("activeclients",activeClients);
         this.setState({
             active_clients:activeClients.length,
             inactive_clients:_clients.length-activeClients.length
         })
       });
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
              <div className={styles.about}>
                <div>
                   
                </div>
              </div>    
            </div>
        )
    }
}

export default MissionControl
