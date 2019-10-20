import React, { Component } from 'react'
import styles from "./styles/loginstyles.css";
import {toast} from "react-toastify";
import {Redirect} from 'react-router-dom';
import routes from "../constants/routes";
import Header from './components/Header';
import SVGBackground from './components/SVGBackground';


const connection=require('../dbhandler/connection').connection;

export class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:''
        } 
    }

    login(e){
        console.log(this.state);
        e.preventDefault();
       
       connection.query(`select * from users where username='${this.state.username}' and password='${this.state.password}';`,(err,results)=>{
         if(err){
            throw err;
         }
         if(results.length){
             toast.success("login success");
             let credintails=results[0];
             localStorage.setItem('AUTH',JSON.stringify(credintails));
             if(credintails.role==='admin'){
                this.setState({
                    roleAdminLoggedIN:true
                });
             }else{
                this.setState({
                    roleUserLoggedIN:true
                });
             }
             toast.success("loggin in..");
         }else{
             toast.error("login failed");
         }
       }); 
        
    }
    render() {
  
        return (
            this.state.roleAdminLoggedIN?<Redirect to={routes.ADMIN_HOME}/>
            :this.state.roleUserLoggedIN?<Redirect to={routes.USER_HOME}/>
            :
            <SVGBackground>
            <div className={styles.container}>
               <Header/>
               <div className={styles.wrapper}>
                <form className={styles.box}>
                    <h1>Login</h1>
                    <input type="text" onChange={e=>this.setState({username:e.target.value})} placeholder="Username"/>
                    <input type="password" onChange={e=>this.setState({password:e.target.value})}  placeholder="Password"/>
                    <input type="submit" value="Login" onSubmit={this.login.bind(this)} onClick={this.login.bind(this)}/>
                </form>
               </div>
            </div>
            </SVGBackground>
        )
    }
}

export default LoginScreen;
