import React, { Component } from 'react'
import styles from "./styles/registerclient.css";
import {
  IoMdHappy
} from "react-icons/io";
import manicon from "../images/man.png";

const moment=require('moment');


export default class RegisterClient extends Component {
     constructor(props){
         super(props);
         this.state={
             firstname:'',
             lastname:'',
             mobile:'',
             dni:'',
             genderMale:true,
             plan:null,
             expiredon:''
         }
     }
    
    createUser(){
           console.log(this.state);
    }
    setprofilesrc({target}){
       console.log("debg",target.files);
       let files = target.files;
       if(files && files.length){
          let fr=new FileReader();
          fr.onload = ()=> {
            this.setState({
                imgsrc: fr.result
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
         console.log(e.target.value);
         
         let months = e.target.value;
         let expiry = this.addMonths(moment(),months);
         let expiredon = expiry.format().split('T')[0].split('-').reverse().join('-');
         this.setState({
             expiredon
         });

    }
    render() {
        let expiry=this.state.expiredon.trim()!='';
        return (
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
                    <div className={styles.input_group}>
                        <input type="number" onChange={({target})=>{this.setState({mobile:target.value})}} placeholder="Mobile"/>
                    </div>
                    <div className={styles.input_group}>
                        <input type="number" placeholder="DNI" onChange={({target})=>{this.setState({dni:target.value})}}/>
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
