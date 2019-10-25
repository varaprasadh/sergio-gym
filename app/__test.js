
const accountSid = "AC0692202b8b98c4093988b08c8fb34612";
const authToken = "0bf4242745d06aec454c9bf0ce754e72";

const client = require('twilio')(accountSid, authToken);

function test(){
client.messages.create({
  from: 'whatsapp:+14155238886',
  body: "test non twilio",
  to: `whatsapp:+919177645896`
}).then(message=>{
    console.log(message);
}).catch(err=>console.log(err));
}

test();
