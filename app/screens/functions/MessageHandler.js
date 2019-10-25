
const accountSid = "AC0692202b8b98c4093988b08c8fb34612";
const authToken = "0bf4242745d06aec454c9bf0ce754e72";

const client = require('twilio')(accountSid, authToken);

export function sendWhatsappMessages(numbers,message){
      return new Promise((resolve,reject)=>{
          let _promises = [];

          numbers.forEach(number => {
              console.log("sending message....")
            _promises.push(client.messages
              .create({
                from: 'whatsapp:+14155238886',
                body: message,
                to: `whatsapp:${number}`
              }));
          });
          Promise.all(_promises).then(logs => {
              console.log("done sending at main file");
             resolve({success:true});
          }).catch(err => {
              console.log(err)
              reject({success:false})
          });
      });
}
