const fs=require('fs');
const connection = require('../../dbhandler/connection').connection;
const path=require('path');
import { readdirSync, write } from "fs";
"../../profilepics"
const _profile_pic_dir = path.join(__dirname, "profilepics");
const _fallback_pic = "../images/man.png";


export function getProfilepic(uid){
    console.log(__dirname, "dirnmae");
    let jpg_form = path.join(_profile_pic_dir, uid + ".jpg");
    let jpeg_form = path.join(_profile_pic_dir, uid + ".jpeg");
    let png_form = path.join(_profile_pic_dir, uid + ".png");

    console.log("getting request for getting dp once..\n\n\n");
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
    
    })
}
export function setProfilePicture(_path,filename){ 
  console.log(_path,filename);
   let picture=fs.readFileSync(_path);
   let _pic_path = path.join(_profile_pic_dir, filename);

  return new Promise((resolve,reject)=>{
     fs.unlink(_pic_path, (err) => {
       if (err) console.log("i know there is no file");
       
       let reader = fs.createReadStream(_path);
       let writer = fs.createWriteStream(_pic_path);
       let stream = reader.pipe(writer);
       stream.on('finish', () => {
          resolve("finish");
       })
     });
  })
}