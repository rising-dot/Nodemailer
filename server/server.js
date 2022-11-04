
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require('nodemailer');

const app = express();



// app.use(express.static('client/public'));


var corsOptions = {
    origin: "http://localhost:8080"
};


app.use(cors(corsOptions));
app.use(bodyParser.json()); 





// app.get('/', function(req, res){
//     res.send("Hello from the root application URL");
// });



app.post('/nodemailer', function (req, res) {

        const output = `
        <h3>Contact Details</h3>
        <ul>  
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `;
    



        //step 1
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }

        });

        // Step 2
        let mailOptions = {
            from: req.body.name +'<'+req.body.email+'>',  // send from
            to: 'YOUR_EMAIL@gmail.com', // the receiver
            subject:'Message from ' + req.body.email + ' - ' + req.body.name,
            html: output // html body
        };

        // Step 3
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return console.log('Error occurs', err);
            }
            return res.status(200).send({"status":"OK"}); 

        });



             





});







// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});







