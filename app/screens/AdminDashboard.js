import React, { Component } from 'react'
import styles from "./styles/admin_board.css";
import { toast } from 'react-toastify';
const uuid=require('uuid');

const connection=require('../dbhandler/connection').connection;

export class AdminDashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            users:[],
            username:'',
            password:''
        }
    }
    componentWillMount(){
       setTimeout(()=>{
           connection.query(`select * from users where (role is NULL) or (role="user")`, (err, results) => {
             if (err) throw err;
             this.setState({
                 users:results
             });
           });
       },1000);
    }
    delete(uname){
        let _users=this.state.users.filter((user)=>{
            return user.username!=uname
        });
        toast.success("deleted successfully!");
        this.setState({
            users:_users
        });

    }
    createUser(){
        let {username,password}=this.state;
        console.log(this.state);
        if(username.trim()!='' && password.trim()!=''){
            connection.query(`select count(username) as count from users where username='${username}'`,(err,results)=>{
                 if(err) throw err;
                 let {count} = results[0];
                 if(count==0){
                     let uid=uuid();
                    let sql=`insert into users values ('${uid}','${username}','${password}',"user")`;
                    console.log(sql);
                    connection.query(sql,(err,results)=>{
                        if(err) throw err;
                        toast.success("user created");
                        this.setState({
                            users:[...this.state.users,...[{username,password,uid}]]
                        });
                    })
                 }else{
                     toast.error("failed to create user");
                 }
            })
        }
    
    }
    render() {
        return (
            <div className={styles.container}>
               <div className={styles.card}>
                   <div className={styles.cardlabel}>Create User</div>
                   <form>
                       <div><input onChange={({target})=>this.setState({username:target.value})} type="text" placeholder="username"/></div>
                       <div><input  onChange={({target})=>this.setState({password:target.value})} type="password" placeholder="password"/></div>
                       <div><input type="submit" onClick={this.createUser.bind(this)} className={styles.submit} value="create user"/></div>
                   </form>
               </div>
               <div className={styles.user_section}>
                  {this.state.users.length ?<div className={styles.userhead}>Users</div>:null}
                  <div className={styles.users}>
                      {
                          this.state.users.map(user=><User onDelete={this.delete.bind(this)} user={user} key={user}/>)
                      }
                  </div>
               </div>
            </div>
        )
    }
}

class User extends Component {
    constructor(props){
        super(props);
    }
    delete(){
       connection.query(`delete from users where username='${this.props.user.username}'`,(err,results)=>{
           if(err) throw err;
           this.props.onDelete(this.props.user.username);
       })
    }
    render() {
        let {username,password}=this.props.user
        return (
           <div className={styles.scard}>
                <div>
                    <span className={styles.label}>username:</span><span className={styles.value}>{username}</span>
                </div>
                <div>
                    <span className={styles.label}>password:</span><span className={styles.value}>{password}</span>
                </div>
                <div className={styles.ctrl}>
                    <div className={styles.delete} onClick={this.delete.bind(this)}>delete</div>
                </div>
            </div>
        )
    }
}


export default AdminDashboard;