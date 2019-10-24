import React, { Component } from 'react'

import styles from "./styles/customerdashboard.css";
import MessageBox from './components/MessageBox';
import RegisterClient from './Actions/RegisterClient';
import CustomerAction from './Actions/CustomerAction';
import Attendence from './Actions/Attendence';
import Messenger from './Actions/Messenger';
import MissionControl from './Actions/MissionControl';

import icon from "./images/running.svg";

import { Switch, Route } from 'react-router';
import {BrowserRouter as Router,Link} from "react-router-dom";
import {Redirect} from 'react-router-dom'

import Routes from '../containers/Routes';
import routes from "./../constants/routes";



export default class CustomerDashboard extends Component {
    constructor(props){
        super(props);
        this.state={
          selectedAction: {
            id: 5,
            component: Messenger
          },
          actions:[
              {
                  id:1,
                  label:"Home",
                  component: MissionControl
              },
              {
                  id:2,
                  label:"Register Client",
                  component:RegisterClient
              },
              {
                 id:3,
                 label:"Clients",
                 component: CustomerAction
              },
              {
                 id:4,
                 label:"Attendence",
                 component: Attendence
              },
              {
                id: 5,
                label: "Messaging",
                component: Messenger
              }
          ],
          logged_out:false
        }
        this.renderActionView = this.renderActionView.bind(this);

    }
    renderActionView=()=>{
        let {component} =this.state.selectedAction;
        return (
            <Route
                component={component}
            />
        )
        
    }
setSelectedAction(_id){
   let obj=this.state.actions.find(({id})=>id===_id);
   this.setState({
       selectedAction:obj
   });

}
logout(){
    localStorage.clear();
    this.setState({
        logged_out:true
    });
}
    render() {
        let selectedID=this.state.selectedAction.id;
        let isloggedout=this.state.logged_out;
        return (
            isloggedout?<Redirect to={routes.LOGIN}/>:
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.header_icon}>
                       <img src={icon} alt="icon"/>
                       <div className={styles.title}>Imperium Fitness GYM</div>
                    </div>
                </div>
                <div className={styles.main_wrapper}>
                    <div className={styles.sidebar}>
                        {this.state.actions.map(({id,label})=>{                           
                            let isSelectedClass=(selectedID==id)?styles.selected:''
                            return (    
                            <div  className={styles.action+" "+isSelectedClass} 
                                 key={id}
                                  onClick={this.setSelectedAction.bind(this,id)}
                                 >
                               {label}
                            </div>)
                        })
                        }
                        <div className={styles.action+" "+styles.logout}
                           onClick={this.logout.bind(this)}
                         >
                              Log Out
                       </div>
                    </div>
                    <div className={styles.control_area}>                   
                           {this.renderActionView()}                       
                    </div>
                </div>
            </div>
        )
    }
}

