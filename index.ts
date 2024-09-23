import axios from "axios";
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import messageRouters from "./src/Router/messageRouter";
import cors from "cors";

let app = express();

app.use(express.json());
app.use(cors());

const mytoken = process.env.MYTOKEN;

console.log("myt", mytoken);

app.listen(9000, () => {
  console.log("app is running");
});

app.get("/webhook", (req, res) => {
  console.log("in");
  let mode = req.query["hub.mode"];
  let challange = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];
  console.log("tokenn", token, mode);

  if (mode && token) {
    console.log("ifff");
    if (mode == "subscribe" && token == mytoken) {
      console.log("inside");
      res.status(200).send(challange);
    } else {
      res.status(403);
    }
  }
});

app.use("/", messageRouters);


// app.post('/webhook', (req, res) => {
//   console.log('Received a message:', JSON.stringify(req.body, null, 2));

//   // Send a response back to WhatsApp
//   const messageText = 'Thanks for your message!';
//   const phon_no_id = '265316890000848';
//   const token = process.env.TOKEN;
//   const recipient = req.body.entry[0].changes[0].value.messages[0].from;

//   axios.post(`https://graph.facebook.com/v20.0/${phon_no_id}/messages?access_token=${token}`, {
//     messaging_product: "whatsapp",
//     to: recipient,
//     type: "text",
//     text: {
//       body: messageText
//     }
//   }, {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   }).then(response => {
//     console.log("Response sent successfully:", response.data);
//   }).catch(error => {
//     console.error("Error sending response:", error.response ? error.response.data : error.message);
//   });

//   res.sendStatus(200);
// });

app.get("/", (req, res) => {
  res.status(200).send("hello this is webhook setup");
});
