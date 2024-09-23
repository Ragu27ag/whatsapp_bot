"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const img_upload_service_1 = require("../service/img_upload.service");
let messageRouters = express_1.default.Router();
const token = process.env.TOKEN;
console.log("tokend", token);
messageRouters.post("/webhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send('OK');
        let body_param = req.body;
        console.log('body', JSON.stringify(body_param, null, 2));
        if (body_param.entry[0].changes[0].value.contacts.length > 0) {
            console.log("inside body param");
            if (body_param.entry &&
                body_param.entry[0].changes &&
                body_param.entry[0].changes[0].value.messages &&
                body_param.entry[0].changes[0].value.messages[0]) {
                // res.sendStatus(200);
                console.log('innnsnsns');
                let phon_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
                let from = body_param.entry[0].changes[0].value.messages[0].from; // '918939250909'  // body_param.entry[0].changes[0].value.messages[0].from;
                // let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
                console.log("phone number" + phon_no_id);
                console.log("from " + from);
                // console.log("boady param " + msg_body);
                // "build": "tsc",
                // "start": "nodemon dist/index.js"
                let message = body_param.entry[0].changes[0].value.messages[0].text.body;
                console.log('messages', message);
                if (message.trim() === 'image') {
                    console.log('imag');
                    let image_id = yield (0, img_upload_service_1.uploadMedia)();
                    let ress = yield axios_1.default.post("https://graph.facebook.com/v20.0/" + phon_no_id + "/messages?access_token=" + token, {
                        messaging_product: "whatsapp",
                        to: from,
                        type: "image",
                        image: {
                            id: image_id, // The media ID obtained from the upload
                            caption: "Your image caption here"
                        }
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    res.status(200).send('OK');
                }
                else if (message.trim() === 'Add template') {
                    console.log('conserd');
                    // let acct_no = '289576474230528';
                    let acct_no = '497834256742308';
                    try {
                        let ress = yield axios_1.default.post("https://graph.facebook.com/v20.0/" + acct_no + "/message_templates", {
                            name: "appoint_inder",
                            language: "en_US",
                            category: "MARKETING",
                            components: [
                                {
                                    type: "HEADER",
                                    format: "TEXT",
                                    text: "Appointment Reminder"
                                },
                                {
                                    type: "BODY",
                                    text: "Check for appointment remainder."
                                },
                                {
                                    type: "FOOTER",
                                    text: "Thank you!"
                                }
                            ]
                        }, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        // let ress = await axios.post(
                        console.log('res', JSON.stringify(ress));
                    }
                    catch (error) {
                        console.log('error', error);
                    }
                    //   "https://graph.facebook.com/v20.0/" + phon_no_id + "/messages?access_token=" + token,
                    //   {
                    //     messaging_product: "whatsapp",
                    //     to: from,
                    //     type: "template",
                    //     template: {
                    //       name: "enquiry",
                    //       language: {
                    //         code: "en_GB",
                    //       },
                    //     },
                    //   },
                    //   {
                    //     headers: {
                    //       "Content-Type": "application/json",
                    //     },
                    //   }
                    // );
                    // console.log("resss", ress.request.res);
                    res.status(200).send('OK');
                }
                else {
                    try {
                        let ress = yield axios_1.default.post("https://graph.facebook.com/v20.0/" + phon_no_id + "/messages?access_token=" + token, {
                            messaging_product: "whatsapp",
                            to: from,
                            text: {
                                body: "Hi.. I'm whats app bot, your message is ",
                            },
                            //   type: "template",
                            //   template: {
                            //     name: "enquiry",
                            //     language: {
                            //       code: "en_GB",
                            //     },
                            //   }
                            // },
                            // {
                            //   messaging_product: "whatsapp",
                            //   to: from,
                            //   type: "interactive",
                            //   interactive: {
                            //     type: "flow",
                            //     header: {
                            //       type: "text",
                            //       text: "Select an Option"
                            //     },
                            //     body: {
                            //       text: "Please choose one of the following options:"
                            //     },
                            //     footer: {
                            //       text: "Powered by Your Company"
                            //     },
                            //     action: {
                            //       button: "Choose Option",
                            //       sections: [
                            //         {
                            //           title: "Main Menu",
                            //           rows: [
                            //             {
                            //               id: "option1",
                            //               title: "Option 1",
                            //               description: "Description for option 1"
                            //             },
                            //             {
                            //               id: "option2",
                            //               title: "Option 2",
                            //               description: "Description for option 2"
                            //             }
                            //           ]
                            //         },
                            //         {
                            //           title: "More Options",
                            //           rows: [
                            //             {
                            //               id: "option3",
                            //               title: "Option 3",
                            //               description: "Description for option 3"
                            //             },
                            //             {
                            //               id: "option4",
                            //               title: "Option 4",
                            //               description: "Description for option 4"
                            //             }
                            //           ]
                            //         }
                            //       ]
                            //     }
                            //   }
                            // },
                            // {
                        }, {
                            headers: {
                                "Content-Type": "application/json",
                            }
                        });
                        // return res.sendStatus(200);
                        // console.log('valsss', JSON.stringify(val));
                        // let ress = await axios.post(
                        //   "https://graph.facebook.com/v20.0/" + phon_no_id + "/messages?access_token=" + token,
                        //   {
                        //     messaging_product: "whatsapp",
                        //     to: from,
                        //     type: "template",
                        //     template: {
                        //       name: "enquiry",
                        //       language: {
                        //         code: "en_GB",
                        //       },
                        //     },
                        //   },
                        //   {
                        //     headers: {
                        //       "Content-Type": "application/json",
                        //     },
                        //   }
                        // );
                        // console.log("resss", ress.request.res);
                    }
                    catch (error) {
                        console.log("errrs", error);
                    }
                }
            }
            // } else {
            //   console.log('esless');
            //   // res.sendStatus(404);
            //   res.status(200).send('OK');
            // }
            res.status(200).send('OK');
        }
        res.status(200).send('OK');
    }
    catch (error) {
        let a = [{ "created_at": "2024-03-07T10:15:37.476Z", "created_by": null, "updated_at": "2024-08-06T05:53:46.553Z", "updated_by": null, "merchant_config_id": "74f70533-6332-4595-95cc-2dfb64ad8289", "chat_id": "-1002020980106", "conversation_id": null, "merchant_name": "IB Merchant", "group_name": "V1 Prod Bot Group", "payin_merchant_pay_id": "5898867741944554", "payout_merchant_pay_id": "1002411671522990", "payin_merchant_salt": "1425c692-b6b7-4120-acd1-21e37507437f", "payout_merchant_salt": "q4G6Dwka1vzzn6VOiXr9QQ==", "bot_type": "Merchant", "module": ["Telegram"], "p2p_version": "V1" }, { "created_at": "2024-03-18T14:07:02.729Z", "created_by": null, "updated_at": "2024-06-12T12:05:59.254Z", "updated_by": null, "merchant_config_id": "f5c72841-3db7-49df-87a3-f24e61909660", "chat_id": "-1002020980106", "conversation_id": null, "merchant_name": "IBNS - IB Payout", "group_name": "V1 Prod Bot Group", "payin_merchant_pay_id": "1700030003497414", "payout_merchant_pay_id": "", "payin_merchant_salt": "fe808f6d-a9ce-472a-892f-eb46b2ce7955", "payout_merchant_salt": "", "bot_type": "Merchant", "module": ["Telegram"], "p2p_version": "V1" }, { "created_at": "2024-05-25T10:05:12.073Z", "created_by": null, "updated_at": null, "updated_by": null, "merchant_config_id": "550f8341-b8fa-4b3f-9c68-125515b2432a", "chat_id": "-1002020980106", "conversation_id": null, "merchant_name": "Anil Merchant", "group_name": "V1 Prod Bot Group", "payin_merchant_pay_id": "", "payout_merchant_pay_id": "1000111648060014", "payin_merchant_salt": "", "payout_merchant_salt": "KRBO6S5bag98NDLtNdEJgw==", "bot_type": "Merchant", "module": ["Telegram"], "p2p_version": "Payout" }, { "created_at": "2024-09-04T05:02:35.966Z", "created_by": null, "updated_at": "2024-09-05T11:15:42.554Z", "updated_by": null, "merchant_config_id": "239abaa4-9210-4576-a0da-0becfcf352d8", "chat_id": "-1002020980106", "conversation_id": null, "merchant_name": "p2pNSin Merchant", "group_name": "V1 Prod Bot Group", "payin_merchant_pay_id": "1724229484160562", "payout_merchant_pay_id": "", "payin_merchant_salt": "d4ce80bf-f74f-419e-a586-97373de88a7e", "payout_merchant_salt": "", "bot_type": "Merchant", "module": ["Telegram"], "p2p_version": "V1" }];
        // console.log('errorrr', error);
    }
}));
exports.default = messageRouters;
