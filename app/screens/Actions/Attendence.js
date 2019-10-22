import React, { Component } from 'react'
import styles from "./styles/customer_action.css";

import {IoMdSearch} from "react-icons/io";
import tempimage from "../images/man.png";
import { toast } from 'react-toastify';

const connection = require("../../dbhandler/connection").connection;
const moment=require('moment');

const {getProfilepic}=require("../functions/DPHandler");

export class CustomerAction extends Component {
    constructor(props){
       super(props);
       this.state={
           customers:[],
           query:'',
           showEditor: false,
           selected_uid: ''
       }
       this.onRemove=this.onRemove.bind(this);
       this.onView=this.onView.bind(this);
       this.fetchClients=this.fetchClients.bind(this);
    }

    componentWillMount(){
         this.fetchClients();
    }
    fetchClients(query=''){
        connection.query(`select * from clients where dni like'${query}%'`, (err, results) => {
          if (err) throw err;
          this.setState({
            customers: results
          });
        })
    }
    onRemove(_uid){
        connection.query(`delete from clients where uid='${_uid}'`,(err,result)=>{
            if(err) throw err;
            console.log(result,"deleted");
            let customers=this.state.customers.filter(({uid})=>{
                  return uid!=_uid;
            });
            this.setState({
                customers
            },()=>{
                toast.success("user has been removed successfully!");
            });
        });
    }
    onView(uid){
      this.setState({
          showEditor:true,
          selected_uid:uid
      });
    }
    search(text){
        console.log(text);
        this.fetchClients(text);
    }
    closeEditor(){
        console.log("closing.....")
        this.setState({
            showEditor: false,
            selected_uid: ''
        })
    }
    render() {
        return (
            <div className={styles.container}>
              
              <div className={styles.searchWrapper}>
                 <div className={styles.search_bar}>
                    <input onChange={({target})=>this.search(target.value)} type="text" placeholder="search with DNI" className={styles.search_box}/>
                    <div className={styles.search_icon}>
                        <IoMdSearch size={40}/>
                    </div>
                 </div>
              </div>
              <div>
                  <div className={styles.customers_wrapper}>
                      <div className={styles.label}></div>
                      <div className={styles.customers_container}>
                         <div className={styles.customers}>
                             {this.state.customers.map((obj,i)=>{
                             return <Customer 
                                 data={obj} key={i}/>
                             })}
                         </div>
                      </div>
                  </div>
              </div>
            </div>
        )
    }
}
class Customer extends Component{
    constructor(props){
          super(props);
           let {data}=this.props;
            let {
              uid,
              firstname,
              lastname,
              dni,
              plan_acivated_date,
              plan,
              last_attended_date
            } = data;
          this.state={
              propic:null,
              uid, firstname, lastname, dni, plan_acivated_date, plan, last_attended_date
          }
    }
    componentWillMount(){
      getProfilepic(this.props.data.uid).then(imageurl => this.setState({
        propic:imageurl
      })).catch(err=>{
         //TODO DO NOTHING FOR NOW.
      });
    }
    markAttendence(){
        let _uid=this.props.data.uid;
        let timestamp=Date.now();
      connection.query(`update clients set last_attended_date=${timestamp} where uid='${_uid}' `,(err,result)=>{
          if(err){
            toast.error("something went wrong,try again later");
          }
          else{
            toast.success("given attendence for today");
            this.setState({
                last_attended_date:timestamp
            });
          }
      })
      
    }
    render(){
      
       let {
         uid,
         firstname,
         lastname,
         dni,
         plan_acivated_date,
         plan,
         last_attended_date
       } = this.state;
       let planeActivated=moment(Number(plan_acivated_date));
       let _last_attended=last_attended_date!=null?moment(Number(last_attended_date+"")).format("DD-MM-YYYY"):"not available";
       let _isAttendedToday=_last_attended===moment().format('DD-MM-YYYY');
       console.log(planeActivated.calendar(),"plane activated on");
       planeActivated.add(plan,'month');
       let isActive = planeActivated.isAfter(moment());
       console.log("expires on",planeActivated.format('DD/MM/YYYY'));
       console.log("isActive",isActive);
        return (
            <div className={styles.customer}>
                <div className={styles.pro_pic}>
                    <img src={this.state.propic||tempimage}/>
                </div>
                <div className={styles.customer_info}>
                    <div className={styles.customer_name}>{firstname+" "+lastname}</div>
                    <div className={styles.customer_dni}>{dni}</div>
                </div>
                <div className={styles.row}>
                    <div>last attended on</div>
                    <div className={styles.red}>{_last_attended}</div>
                </div>
                <div className="S">
                   {!_isAttendedToday?<div
                        onClick={this.markAttendence.bind(this)}
                        className={styles.attend}>MARK ATTENDENCE</div>
                   : <div className={styles.attended}>ATTENDED TODAY</div> 
                   }
                </div>
            </div>
        )
    }
}

export default CustomerAction
