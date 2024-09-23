"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const messageRouter_1 = __importDefault(require("./src/Router/messageRouter"));
const cors_1 = __importDefault(require("cors"));
let app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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
        }
        else {
            res.status(403);
        }
    }
});
app.use("/", messageRouter_1.default);
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
