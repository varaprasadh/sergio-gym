import React, { Component } from 'react'
import styles from "./styles/registerclient.css";
export default class RegisterClient extends Component {
     constructor(props){
         super(props);
         this.state={
             firstname:'',
             lastname:'',
             mobile:'',
             dni:'',
             genderMale:true,
             plan:null
         }
     }
    
    createUser(){
           console.log(this.state);
    }
    membershipChange(){

    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.model}> 
                    <div className={styles.card}>
                    <div className={styles.title}>Register</div>
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
                            <div><input type="radio" name="gender" checked id="male" onChange={({target})=>{console.log(target);this.setState({genderMale:target.checked})}}/></div><label for="male">Male</label>
                        </div>
                        <div className={styles.row}>
                            <div><input type="radio" name="gender" id="female" onChange={({target})=>{this.setState({genderMale:!target.checked})}}/></div><label for="female">Female</label>                     
                        </div>
                    </div>    
                    <div className={styles.input_group}>
                        <select onChange={this.membershipChange.bind(this)}>
                            <option>choose membership plan</option>
                            <option>6 months</option>
                            <option>1 year</option>
                        </select>
                        <div className={styles.info}>membership will be expired on <span className={styles.expiredon}>12-12-2019</span></div>
                    </div>   
                        <a className={styles.submit} onClick={this.createUser.bind(this)}>submit</a>
                    </div>
                </div>
            </div>
        )
    }
}
