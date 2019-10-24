import React, { Component } from 'react'
import styles from "./styles/registerclient.css";
import {
  IoMdHappy
} from "react-icons/io";
import manicon from "../images/man.png";
import { toast } from 'react-toastify';
import Initializer from '../Initializer';

import ModernDatepicker from 'react-modern-datepicker';

const moment=require('moment');

const fs=require('fs');
const path=require('path');

const uuid=require('uuid');

const connection=require('../../dbhandler/connection').connection;


export default class RegisterClient extends Component {
     constructor(props){
         super(props);
         this.state={
             firstname:'',
             lastname:'',
             mobile:'',
             dni:'',
             genderMale:true,
             dob:'',
             plan:null,
             expiredon:'',
             imgsrc: null,
             c_code:"+51"
         }
         this.handleDOBChange=this.handleDOBChange.bind(this);
     }
    
    createUser(){
         let { firstname,lastname,c_code,mobile,dni,genderMale,plan,imgsrc,dob}=this.state;
         console.log(this.state);

         let doj = Date.now();
         let uid = uuid();
         let plan_activatedOn = doj;

         if(firstname.trim()!=''&& lastname.trim()!='' && /^\d{8,10}$/.test(mobile) &&/^\+\d\d$/.test(c_code)&& /^\d{8}$/.test(dni) && plan && plan.trim()!=''&& dob.trim()!=''){
            this.setState({
              loading: true
            });

            let gender=genderMale?"male":"female";
            connection.query(`insert into clients values ('${uid}','${firstname}','${lastname}','${c_code}${mobile}','${dni}','${dob}','${doj}',${plan_activatedOn},null,'${gender}','${plan}')`,(err,result)=>{
                if(err) {
                    toast.error("something went wrong try again later");
                };
                console.log(result);
                toast.success('account created!');
                setTimeout(()=>{
                    this.setState({
                      loading: false,
                      _dob:''
                    })
                },1500);
            })
            if(imgsrc==null){
                toast.warn("profile image not choosen.. you can upload it later");
            }
            else{
               let readStream = fs.createReadStream(this.state.file.path);
               console.log(readStream);
               let filepath = path.join(__dirname, 'profilepics', uid + "." + this.state.file.type.split('/')[1]);
               console.log(filepath);
               readStream.pipe(fs.createWriteStream(filepath));
               this.setState({
                   imgsrc:null
               });
            } 
            toast.success("please wait...");

               
         }else{
             
             toast.error("fill the details correctly");
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
                imgsrc: fr.result
            })
            this.setState({
                file:files[0]
            })
        }
        fr.readAsDataURL(files[0]);
       }
    }
    addMonths =(d, months) =>{
      var fm = moment(d).add(months, 'M');
      var fmEnd = moment(fm).endOf('month');
      return d.date() != fm.date() && fm.isSame(fmEnd.format('YYYY-MM-DD')) ? fm.add(1, 'd') : fm;
    }
    membershipChange(e){
        if (e.target.value.trim()!=''){
           let months = e.target.value;
           let expiry = this.addMonths(moment(), months);
           let expiredon = expiry.format().split('T')[0].split('-').reverse().join('-');
           this.setState({
             expiredon,
             plan:months
           });
        }else{
            this.setState({
                expiredon:''
            })
        }
    }
    handleDOBChange(date){
        let timestamp=Date.parse(date.split('-').reverse().join('-'))+"";
        this.setState({ 
            dob:timestamp,
            _dob:date
        });
        console.log("deg",date);
    }
    render() {
        let expiry=this.state.expiredon.trim()!='';
        return (
            this.state.loading?<Initializer/>:
            <div className={styles.container}>
                <div className={styles.model}> 
                    <div className={styles.card}>
                    <div className={styles.title}>Register</div>
                    
                    <div className={styles.input_group}>
                        <div className={styles.profilepic_wrapper}>
                            {this.state.imgsrc ? <img src={this.state.imgsrc} className={styles.profilepic} alt="no image uploaded"/>:
                               <img src={manicon} className={styles.profilepic}/>
                        }
                        <div className={styles.upload_btn} onClick={()=>this.fileupload.click()}>upload profile picture</div>
                        </div>
                        <input type="file" hidden ref={fileupload=>this.fileupload=fileupload} accept="image/*" onChange={this.setprofilesrc.bind(this)}/>
                    </div>
                    <div className={styles.input_group}>
                        <input type="text" onChange={({target})=>{this.setState({firstname:target.value})}} placeholder="First Name"/>
                    </div>
                    <div className={styles.input_group}>
                        <input type="text" onChange={({target})=>{this.setState({lastname:target.value})}} placeholder="Last Name"/>
                    </div>
                    <div className={styles.input_group+" "+styles.row}>
                        <div className={styles.country_code}>
                             <input type="text" pattern="\d*" 
                               onChange={({target})=>{this.setState({c_code:target.value})}} 
                               placeholder="country code"
                               value={this.state.c_code} maxLength="3"/>
                        </div>
                        <div className={styles.mobile}>
                            <input type="number"
                                onChange={({target})=>{this.setState({mobile:target.value})}} 
                                placeholder="Mobile"/>
                        </div>
                        
                    </div>
                    <div className={styles.input_group}>
                        <input type="number" placeholder="DNI" onChange={({target})=>{this.setState({dni:target.value})}}/>
                    </div>    
                    <div className={styles.input_group+" "+styles.showtop}>
                       <div>Date of Birth:</div>
                        <ModernDatepicker
                            date={this.state._dob}
                            format={'DD-MM-YYYY'}
                            showBorder
                            onChange={date => this.handleDOBChange(date)}
                            placeholder={'Select a date'}
                        />
                    </div>    
                    <div className={styles.gender}>
                        <div className={styles.row}>
                            <div><input type="radio" name="gender" checked={this.state.genderMale} id="male" onChange={({target})=>{this.setState({genderMale:target.checked})}}/></div>
                            <label  htmlFor="male">Male</label>
                        </div>
                        <div className={styles.row}>
                            <div><input type="radio" name="gender" id="female" onChange={({target})=>{this.setState({genderMale:!target.checked})}}/></div>
                            <label htmlFor="female">Female</label>                     
                        </div>
                    </div>    
                    <div className={styles.input_group}>
                        <select onChange={this.membershipChange.bind(this)}>
                            <option value="">choose membership plan</option>
                            <option value="6">6 months</option>
                            <option value="12">1 year</option>
                        </select>
                       {  expiry && <div className={styles.info}>membership will be expired on <span className={styles.expiredon}>{this.state.expiredon}</span></div> }
                    </div>   
                        <a className={styles.submit} onClick={this.createUser.bind(this)}>submit</a>
                    </div>
                </div>
            </div>
        )
    }
}
