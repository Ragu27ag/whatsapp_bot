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
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
let app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv.config();
const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;
console.log("myt", mytoken);
app.listen(() => {
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
app.post("/webhook", (req, res) => {
    //i want some
    let body_param = req.body;
    console.log(JSON.stringify(body_param, null, 2));
    if (body_param.object) {
        console.log("inside body param");
        if (body_param.entry &&
            body_param.entry[0].changes &&
            body_param.entry[0].changes[0].value.messages &&
            body_param.entry[0].changes[0].value.messages[0]) {
            let phon_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
            let from = body_param.entry[0].changes[0].value.messages[0].from;
            let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
            console.log("phone number" + phon_no_id);
            console.log("from " + from);
            console.log("boady param " + msg_body);
            // "build": "tsc",
            // "start": "nodemon dist/index.js"
            (0, axios_1.default)({
                method: "POST",
                url: "https://graph.facebook.com/v13.0/" +
                    phon_no_id +
                    "/messages?access_token=" +
                    token,
                data: {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: "Hi.. I'm whats app bot, your message is " + msg_body,
                    },
                },
                headers: {
                    "Content-Type": "application/json",
                },
            });
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }
});
app.get("/", (req, res) => {
    res.status(200).send("hello this is webhook setup");
});
