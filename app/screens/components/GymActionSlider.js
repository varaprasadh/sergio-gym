import React, { Component } from 'react'
import styles from "./styles/slider.css";


export class GymActionSlider extends Component {
    render() {
        return (
            <div className={styles.wrapper}> 
                    <div className={styles.img_wrap}> <img src={require("../images/gym_actions/beanball.png")}/>     </div> 
                    <div className={styles.img_wrap}> <img src={require("../images/gym_actions/dumbel_lift.png")}/>  </div>
                    <div className={styles.img_wrap}> <img src={require("../images/gym_actions/jog.png")}/>         </div>
                    <div className={styles.img_wrap}> <img src={require("../images/gym_actions/lift.png")}/>         </div>
                    <div className={styles.img_wrap}> <img src={require("../images/gym_actions/stretch.png")}/>      </div>
                    <div className={styles.img_wrap}> <img src={require("../images/gym_actions/tredmill.png")}/>     </div>
                    <div className={styles.img_wrap}> <img src={require("../images/gym_actions/ring.png")}/>        </div>
            </div>
        )
    }
}


export default GymActionSlider
