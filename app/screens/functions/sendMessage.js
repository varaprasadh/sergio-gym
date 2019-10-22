
const accountSid = "AC35a779cb62e0e8a51aab867cc8562de6";
const authToken = "77f0ee1a666cb61aa384278d668e1ba0";

const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        from: 'whatsapp:+14155238886',
        body: "message",
        to: 'whatsapp:+918106492369'
    })
    .then(message => console.log(message.sid));