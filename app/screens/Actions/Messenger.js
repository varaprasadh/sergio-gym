import React, { Component } from 'react'
import SVGBackground from "../components/SVGBackground";
import styles from "./styles/messenger.css";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { sendWhatsappMessages } from '../functions/MessageHandler';
import { ipcRenderer } from 'electron';


import {Calendar} from 'react-calendar-component';
import 'moment/locale/nb';

import crStyles from "./styles/calender_styles.css"
const moment = require('moment');


const connection=require("../../dbhandler/connection").connection;

 

export class Messenger extends Component {
    constructor(props){
        super(props);
        this.state={
            type:null,
            clients:[],
            filtered_clients:[],
            query:'',
            message:''
        }
        this.handleMessageTypeChange=this.handleMessageTypeChange.bind(this);
    }
    componentWillMount(){
         connection.query(`select * from clients`, (err, results) => {
           if (err) throw err;
           console.log(results);
           this.setState({
             clients: results
           });
         })
    }
    handleMessageTypeChange(value){

        this.setState({
            type:value,
            filtered_clients:[]
        });
        //TODO get clients based on type its checked...lets say bday clients;
       
         if (value.value === 0) {
            let _filterred=this.state.clients.filter(({dob})=>{
                let _dob=moment(Number(dob+"")).format("DD-MM");
                console.log(_dob,"hehe");
                let now=moment().format("DD-MM");
                return _dob===now;
            });
            console.log("birthday bioys", _filterred);
            this.setState({
                filtered_clients:_filterred
            });

         } else if (value.value === 1) {
           this.setState({
               filtered_clients:this.state.clients
           });
         } else if (value.value === 2) {
           let _filterred=this.state.clients.filter(({last_attended_date})=>{
               let _now=moment();
               let _last=moment(Number(last_attended_date+""));
               let diff = Math.floor(moment.duration(_now.diff(_last)).asDays());
            // let diff = Math.abs(moment.duration(_last.diff(_now)).asDays());
                return diff>=7 || last_attended_date==null;
           });
          this.setState({
              filtered_clients:_filterred
          });
        }
        
    }
    onCheck(_uid,status){
        console.log(_uid,status);

        let _client_id=this.state.filtered_clients.findIndex(({uid})=>{
            return uid===_uid;
        });
        let __clients=this.state.filtered_clients;
        __clients[_client_id].checked=status;
        this.setState({
            filtered_clients:__clients
        });
    }
    sendMessages() {
      let _message=this.state.message;
      let  _receivers=this.state.filtered_clients.filter(({checked=false})=>checked);
      let numbers=_receivers.map(({mobile})=>mobile);
      console.log(numbers);
    //   sendWhatsappMessages(numbers,_message); 
     
    
      if(_message.trim()!=''){
        ipcRenderer.send('send-whatsapp-messages', numbers, _message);
         ipcRenderer.once('send-whatsapp-messages-status', (event, reply) => {
           if (reply.success == true) {
             toast.success("messages has been sent");
           } else {
             toast.error("oops, something went wrong,messages may not be sent")
           }
         });

      }else{
          toast.error("choose receivers and write valid message");
      }
     

    }
    render() {

          const plans = [
                { label: "Birth Day Messages", value: 0 },
                { label: "Promotional Messages", value: 1  },
                { label: "Absent Messages", value: 2 }
         ];
         let _secondary_filter=this.state.filtered_clients.filter(({dni})=>{
             return dni.startsWith(this.state.query.trim());
         });
         let _selected_receivers=this.state.filtered_clients.filter(({checked=false})=>checked);

        return (
           <div className={styles.container}>
            <div className={styles.title}>
                Messenger
            </div>
            <div className={styles.wrapper}>
                <div className={styles.clients_control}>
                <div className={styles.clients_wrapper}>
                    <div className={styles.clients_wrapper_label}>choose receivers</div>
                    <div className={styles.clients}>
                    {
                        _secondary_filter.map((client, i) => {
                            return <ClientCard
                                onCheck={this.onCheck.bind(this)}
                                data={client} key={i}/>
                        })
                    }
                </div>
                </div>
                <div className={styles.clients_wrapper}>
                    <div className={styles.clients_wrapper_label}>choosen receivers</div>
                    <div className={styles.selectedClients+" "+styles.clients}>
                     {
                        _selected_receivers.map((client, i) => {
                            return <ClientCard
                                noCheckBox
                                data={client} key={i}/>
                        })
                     }
                    </div>
                </div>
             </div>
             <div className={styles.flow_control}>
                <div className={styles.search_control}>
                    <div className={styles.searchHandler}>
                        <input type="text" 
                        onChange={({target})=>this.setState({query:target.value})}
                        placeholder="search here ...with dni" 
                        className={styles.searchinput}/>
                    </div>
                    <div className={styles.messageType}>
                        <label>choose message Type</label>
                        <Select
                            value={this.state.type}
                            onChange={this.handleMessageTypeChange.bind(this)}
                            options={plans} />
                    </div>
                </div>
                <div className={crStyles.calendar}>
                    <CalendarExample/>
                </div>
                <div className={styles.messageBox}>
                    <label>Message</label>
                    <div>
                        <textarea 
                          placeholder="enter message"
                          type="text" 
                          onChange={({target})=>this.setState({message:target.value})}
                          className={styles.msg_input}/>
                    </div>
                    <div className={styles.align_end}>
                      <div 
                       onClick={this.sendMessages.bind(this)}
                       className={styles.send_btn}>SEND</div>
                    </div>
                    
                </div>
             </div>
            </div>
           </div>
        )
    }
}
class ClientCard extends Component{
    constructor(props){
        super(props);
        this.state={
            checked:true
        }    
    }
    render(){
        let {uid,firstname,lastname,mobile,dni,checked=false}=this.props.data;
        return(
            <div className={styles.client_card}>
               <div className={styles.card_info}>
                   <div className={styles.row}>
                      <label>Name :</label>
                      <div className={styles._name}> {firstname+" "+lastname}</div>
                   </div>
                   <div className={styles.row}>
                      <label>Mobile :</label>
                      <div className={styles._mobile}> {mobile}</div>
                   </div>
                   <div className={styles.row}>
                      <label>DNI : </label>
                      <div className={styles.dni}> {dni}</div>
                   </div>
               </div>
                {
                !this.props.noCheckBox && 
                    <div className={styles.checkbox}>
                        <input checked={checked} onChange={({target})=>this.props.onCheck(uid,target.checked)} type="checkbox"  />
                    </div>
                }
            </div>
        )
    }
}


export default Messenger;


class CalendarExample extends Component {
  state = {
    date: moment()
  };
 
  cx(classnames){
      console.log(classnames);
      return 'Calendar-grid-item';
  }
  render() {
    return (
     <div className={crStyles.Calendar_grid}>
      <Calendar
        onChangeMonth={date => this.setState({ date })}
        date={this.state.date}
        onPickDate={date => console.log(date)}
        renderDay={({ day, classNames, onPickDate }) => (
          <div
            key={day.format()}
            className={this.cx(
              crStyles.Calendar_grid_item,
              day.isSame(moment(), 'day') && crStyles.Calendar_grid_item_current,
            )}
            onClick={e => onPickDate(day)}
          >
            {day.format('D')}
          </div>
        )
        }
        renderHeader={({ date, onPrevMonth, onNextMonth }) => (
          <div className={crStyles.Calendar_header}>
            <button onClick={onPrevMonth}>«</button>
            <div className={crStyles.Calendar_header_currentDate}>
              {date.format('MMMM YYYY')}
            </div>
            <button onClick={onNextMonth}>»</button>
          </div>
        )}
      />
       </div>
    );
  }
}
