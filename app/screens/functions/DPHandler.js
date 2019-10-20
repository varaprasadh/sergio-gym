const fs=require('fs');
const connection = require('../../dbhandler/connection').connection;
const path=require('path');
import { readdirSync } from "fs";
"../../profilepics"
const _profile_pic_dir = path.join(__dirname, "profilepics");
const _fallback_pic = "../images/man.png";


export function getProfilepic(uid){
    console.log(__dirname, "dirnmae");
    let jpg_form = path.join(_profile_pic_dir, uid + ".jpg");
    let jpeg_form = path.join(_profile_pic_dir, uid + ".jpeg");
    let png_form = path.join(_profile_pic_dir, uid + ".png");
    return new Promise((resolve,reject)=>{
      fs.stat(jpg_form, function (err, stat) {
        if (err) {
          fs.stat(jpeg_form, function (err, stat) {
            if (err) {
              fs.stat(png_form, function (err, stat) {
                if (err) {
                     reject("not found");
                } else {
                  console.log("exitesd png", uid);
                    resolve(png_form);
                }
              })
            } else {
              console.log("exitesd jpeg", uid);
                  resolve(jpeg_form);
            }

          })
        } else {
          console.log("exitesd jpg", uid);
               resolve(jpg_form);
        }
      });
    //  resolve(tempimage);
    })

    // console.log(uid);
    
}