import React, { Component } from 'react'
import styles from "./styles/customer_action.css";

import {IoMdSearch} from "react-icons/io";
import tempimage from "../images/man.png";
import { toast } from 'react-toastify';
import { ipcRenderer } from 'electron';
import ProfileEditor from '../components/ProfileEditor';

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
                                 onRemove={uid=>this.onRemove(uid)}
                                 onView={uid=>this.onView(uid)}
                                 data={obj} key={i}/>
                             })}
                         </div>
                      </div>
                  </div>
              </div>
              {this.state.showEditor?<ProfileEditor 
                      onClose={this.closeEditor.bind(this)}
                      uid={this.state.selected_uid}/>
               :null}
            </div>
        )
    }
}
class Customer extends Component{
    constructor(props){
          super(props);
          this.state={
              propic:null
          }
    }
    componentWillMount(){
      getProfilepic(this.props.data.uid).then(imageurl => this.setState({
        propic:imageurl
      })).catch(err=>{
         //TODO DO NOTHING FOR NOW.
      });
    }
    render(){
       let {data}=this.props;
       let {uid,firstname,lastname,dni,plan_acivated_date,plan}=data;
       let planeActivated=moment(Number(plan_acivated_date));
      
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
                <div className={styles.planStatus}>
                  {
                    isActive?<div className={styles.active}>PLAN IS ACTIVE</div>:
                    <div className={styles.inactive}>PLAN EXPIRED</div>
                  } 

                </div>
                <div className={styles.controls}>
                   <div onClick={()=>this.props.onRemove(uid)} className={styles.remove_btn}>REMOVE</div>
                   <div onClick={()=>this.props.onView(uid)} className={styles.modify_btn}>VIEW</div>
                </div>
            </div>
        )
    }
}

export default CustomerAction
