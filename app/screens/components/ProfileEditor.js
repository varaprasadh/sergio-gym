import React, { Component } from 'react'
import styles from "./styles/profile_editor.css";
import ModernDatepicker from 'react-modern-datepicker';
import { getProfilepic, setProfilePicture } from '../functions/DPHandler';
import logo from "./images/running.svg"
import { toast } from 'react-toastify';
import Select from 'react-select';

const connection = require("../../dbhandler/connection").connection;
const moment=require('moment');
const fs=require('fs');
const path=require('path');

export class ProfileEditor extends Component {
    constructor(props){
        super(props);
       this.handleDOBChange=this.handleDOBChange.bind(this);
       this.changePlanDate = this.changePlanDate.bind(this);
       this.loadData = this.loadData.bind(this);
       this.state={
           _dob:'',
           editable:false,
           isActive:false
       }
    }
    componentWillMount(){
        this.loadData();
    }
    loadData(){
          let {uid}=this.props;
        connection.query(`select * from clients where uid='${uid}'`,(err,res)=>{
            if(err) throw err;
            let data=res[0];
            let {
                uid,
                firstname,
                lastname,
                dni,
                mobile,
                plan_acivated_date,
                plan,
                dob,
                doj,
                last_attended_date
            }=data;
            this.setState({
                uid,
                firstname,
                lastname,
                dni,
                mobile,
                plan_acivated_date,
                plan,
                dob,
                doj,
                last_attended_date
            });
          let __dob=moment(Number(dob)).format('DD-MM-YYYY');
          let __plan_acivated_date = moment(Number(plan_acivated_date)).format('DD-MM-YYYY');
          console.log("\n\n",dob);
          this.setState({
              _dob:__dob,
             _plan_acivated_date: __plan_acivated_date
          })
        });
        getProfilepic(uid).then(path=>{
             this.setState({
                 propic:path
             });
        }).catch(()=>{
            this.setState({
                propic:logo
            })
        });
        
    }
    handleDOBChange(date) {
      let timestamp = Date.parse(date.split('-').reverse().join('-')) + "";
      this.setState({
        dob: timestamp,
        _dob: date
      });
      console.log("deg", date);
    }
    save(){
       let {
           uid,
           firstname,
           lastname,
           dni,
           mobile,
           plan_acivated_date,
           plan,
           dob,
           doj,
       } = this.state;
      if(/^\d{8}$/.test(dni)){
           let values = [firstname, lastname, dni, mobile, plan_acivated_date, plan, dob]
           connection.query(`update clients set firstname=?,lastname=?,dni=?,mobile=?,plan_acivated_date=?,plan=?,dob=? where uid='${uid}'`, values, (err, results) => {
             if (err) toast.error("something went wrong,try again later");
             else {
               toast.success("profile save successfully");
               this.props.onClose();
             }

           })
      }else{
          toast.error("fill up details correctly!");
      } 
    }
    setprofilesrc({target}){
       console.log("debg",target.files);
       let files = target.files;
       console.log(files[0]);
       if(files && files.length){
          let fr=new FileReader();
          fr.onload = ()=> {
            this.setState({
                propic: fr.result
            })
            let _file=files[0];
            setProfilePicture(_file.path,this.state.uid+"."+_file.type.split('/')[1]).then(()=>{
                toast.success("profile photo changed successfully");
            }).catch(err=>{
                toast.success("something went wrong,picture didn't updated")
            });
           
        }
        fr.readAsDataURL(files[0]);
       }
    }
   addMonths = (d, months) => {
     var fm = moment(d).add(months, 'M');
     var fmEnd = moment(fm).endOf('month');
     return d.date() != fm.date() && fm.isSame(fmEnd.format('YYYY-MM-DD')) ? fm.add(1, 'd') : fm;
   }
    handlePlanChange = selectedOption => {
      this.setState({
        plan:selectedOption.value+""
      });
      console.log(`Option selected:`, selectedOption);
    };
    changePlanDate(date){
        console.log("daaarrr",date);
         let timestamp = Date.parse(date.split('-').reverse().join('-')) + "";
         console.log("debuggggggg",date);
         this.setState({
            plan_acivated_date:timestamp,
            _plan_acivated_date:date
         });
         console.log("deg", date);
    }
    render() {
        const plans = [
                { label: "6 Months", value: 6 },
                { label: "1 Year", value: 12 },
         ];
        let currentPlan=this.state.plan==="6"?plans[0]:plans[1];
        let __expiredon = this.addMonths(moment(Number(this.state.plan_acivated_date + "")), Number(this.state.plan));
        let _expiredon = __expiredon.format("DD-MM-YYYY");
        let _planActivatedOn=moment(Number(this.state.plan_acivated_date+'')).format("DD-MM-YYYY");
        let isActive = __expiredon.isAfter(moment());
        let join_date=moment(Number(this.state.doj+"")).format("DD-MM-YYYY");

        return (
           <div className={styles.editor}>
                  <div className={styles.editor_main}>
                     <div className={styles.title}>Edit Profile</div>
                     <div className={styles.main_data}>
                         <div className={styles.uploadimage}>
                             <div className={styles.image}>
                                <img src={this.state.propic} alt="profile image" className={styles.pro_pic}/>
                             </div>
                            <div 
                            onClick={()=>this.uploadfile.click()}
                            className={styles.changeDP}>CHANGE PROFILE PICTURE
                            </div>
                         </div>
                          <input 
                             ref={uploadfile=>this.uploadfile=uploadfile}
                             type="file" accept="image/*" hidden
                             onChange={this.setprofilesrc.bind(this)}
                              />
                        <div className={styles.m_data}>
                            <div className={styles.c_input}>
                                <label>Firstname</label>
                                <input 
                                   onChange={({target})=>{this.setState({firstname:target.value})}}
                                   type="text" value={this.state.firstname}/>
                            </div>
                           
                            <div className={styles.c_input}>
                                <label>Lastname</label>
                                <input 
                                 onChange={({target})=>{this.setState({lastname:target.value})}}
                                 type="text" value={this.state.lastname}/>
                            </div>
                            <div className={styles.c_input}>
                                <label>Mobile</label>
                                <input 
                                maxLength={10}
                                onChange={({target})=>{this.setState({mobile:target.value})}}
                                type="number" value={this.state.mobile}/>
                            </div>
                            <div className={styles.c_input}>
                                <label>DNI</label>
                                <input type="number" 
                                maxLength={8}
                                onChange={({target})=>{this.setState({dni:target.value})}}
                                value={this.state.dni}/>
                            </div>
                            <div className={styles.c_input}>
                                <label>Date of Birth</label>
                                <ModernDatepicker
                                    date={this.state._dob}
                                    format={'DD-MM-YYYY'}
                                    showBorder
                                    onChange={date => this.handleDOBChange(date)}
                                    placeholder={'Select a date'}
                                />
                            </div>
                             <div className={styles.c_input}>
                                <label>Joined on</label>
                                <div className={styles.plan_active}>{join_date}</div>
                            </div>
                        </div>
                        <div className={styles.plan_controller}>
                             
                            <div className={styles.c_input}>
                                <label>plan</label>
                                <div className={styles.plan}>
                                    <Select
            
                                        value={currentPlan}
                                        onChange={this.handlePlanChange}
                                        options={plans} />
                                </div>
                            </div>
                            <div className={styles.c_input}>
                                <label>Plan Activated On</label>
                                <div className={styles.date_picker}>
                                    <ModernDatepicker
                                   
                                    date={this.state._plan_acivated_date}
                                    format={'DD-MM-YYYY'}
                                    showBorder
                                    onChange={date=>this.changePlanDate(date)}
                                    placeholder={'Select a date'}
                                   />
                                </div>
                            </div>
                             <div className={styles.c_input}>
                                <label>Expired By</label>
                                <input type="text" disabled value={_expiredon}/>
                            </div>
                            
                             <div className={styles.c_input}>
                                <label>Status</label>
                                {isActive==true?<div className={styles.plan_active}>ACTIVE</div>
                                :<div className={styles.plan_expired}>EXPIRED</div>}
                            </div>
                            
                        </div>
                     </div>
                     <div className={styles.controls}>
                          <div onClick={()=>this.props.onClose()} className={styles.cancel}>CANCEL</div>
                          <div onClick={this.save.bind(this)} className={styles.save}>SAVE</div>
                     </div>
                  </div>
            </div>
        )
    }
}

export default ProfileEditor
