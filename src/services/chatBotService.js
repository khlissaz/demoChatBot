import request from "request";
require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getFacebookUsername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        let uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
        request({
            "uri": uri,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                //convert string to json object
                body = JSON.parse(body);
                let username = `${body.last_name} ${body.first_name}`;
                resolve(username);
            } else {
                reject("Unable to send message:" + err);
            }
        });
    });
};
let sendResponseWelcomeNewCustomer = ( sender_psid) => {
    return new Promise(async (resolve, reject) => {

        try {
            let username= await getFacebookUsername(sender_psid);
           // let response_first = { "text": "سلام " + username + "، كيفاه نجمو نعاونوك؟ /g Comment pouvons-nous vous aider exactement ? " };
            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "سلام " +username+ "، كيفاه نجمو نعاونوك؟ \n Comment pouvons-nous vous aider exactement ? ",
                            "subtitle": "Trust-it est le 1er réseau des réparateurs de confiance en Tunisie",
                            "image_url": "https://statics.trustit.tn/categories/1589646792461.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Demandez un service",
                                    "payload": "Demander_service",
                                },

                            ],
                        }]
                    }
                }
            };

            //send a welcome message
           // await sendMessage(sender_psid, response_first);

            //send a image with button view main menu
            await sendMessage(sender_psid, response_second);
            console.log("/////" + resolve);
            resolve("done!")
        } catch (e) {
            console.log("/////" + e);
            reject(e);
        }


    });

};



let sendServiceList = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Trust-it est le 1er réseau des réparateurs de confiance en Tunisie",
                            "subtitle": "Votre service est notre objectif",
                           // "image_url": "https://www.trustit.tn/assets/img/logo.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Demander une réparation",
                                    "payload": "DEMANDER_REPARATION",
                                },
                                {

                                    "type":"web_url",
                                    "url":"https://www.facebook.com/VendoTN/",
                                    "title":"Acheter un produit"

                                },
                                {
                                    "type": "postback",
                                    "title": "Donner avis",
                                    "payload": "AVIS_RECLAMATION",
                                },


                            ],
                        }]
                    }
                }
            };

            //send a welcome message
            await sendMessage(sender_psid, response);
            console.log("/////" + resolve);
            // resolve("done!")
        } catch (error) {
            console.log("/////" + error);
            reject(error);
        }
    });
};

let demanderReperation = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Service aux utilisateurs de Smartphones, Laptops et Consoles de jeux pour des réparations de confiance grâce à un réseau de réparateurs compétents sur tout le territoire Tunisien",
                           // "subtitle": "Votre service est notre objectif",
                            "image_url": "https://technews.tn/wp-content/uploads/2017/10/20376077_835954156564895_5452148611624838675_n.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Réparation Smartophone",
                                    "payload": "SMARTPHONE",
                                },
                                {
                                    "type": "postback",
                                    "title": "Réparation Ordinateur",
                                    "payload": "ORDINATEUR",
                                },
                                {
                                    "type": "postback",
                                    "title": "Réparation Console",
                                    "payload": "CONSOLE",
                                },


                            ],
                        }]
                    }
                }
            };

            //send a welcome message
            await sendMessage(sender_psid, response);
            console.log("/////" + resolve);
            // resolve("done!")
        } catch (error) {
            console.log("/////" + error);
            reject(error);
        }
    });
};

let handleDeposRep =(sender_psid)=>{
return new Promise(async(resolve,reject)=>{
    try {
        
let username= await getFacebookUsername(sender_psid);
let response = {"text":"Veuillez "+username+" nous informer le modele de votre terminal."};




        await sendMessage(sender_psid, response);

    } catch (error) {
        reject(error)
    }
});
}

let sendMessageAskingPhoneNumber = (sender_psid) => {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "Merci de nous envoyer votre numéro contact pour qu'on puisse vous rejoindre.",
            "quick_replies": [
                {
                    "content_type": "user_phone_number",
                }
            ]
        }
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

let sendMessageAskingPanne = (sender_psid) => {
    return new Promise(async(resolve,reject)=>{
        try {
            
    //let username= await getFacebookUsername(sender_psid);
    let response = {"text":"Veuillez maintenant nous préciser la panne."};
      
    
            await sendMessage(sender_psid, response);
            console.log('787878panne sent!')
        } catch (error) {
            console.log('panne no sent"Unable to send panne!')
            reject(error)
        }
    });
};


let sendMessageAskingModele = (sender_psid) => {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "Merci de nous envoyer le modele exacte de votre smartphone",
            "quick_replies": [
                {
                    "content_type": "user_modele",
                }
            ]
        }
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log(res+"---------"+body)
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};




let goBackToServiceList = (sender_psid) => {
    sendServiceList(sender_psid);
};

let sendMessage = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('*****message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });

};
let  sendMessageDoneDeposerReperation= async  (sender_id) => {
    try {
        let response = {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://media.giphy.com/media/daxhIRBXW3WMoNaqGo/giphy.gif"
                }
            }
        };
         sendMessage(sender_id, response);

        //get facebook username
        let username = await getFacebookUsername(sender_id);

        //send another message
        let response2 = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": `Bien reçu! \nLe service client va vous appeler dès que possible ${username}.\n \nSouhaitez-vous consulter notre liste de services?`,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Demander un service",
                            "payload": "Demander_service"
                        },
                        {
                            "type":"phone_number",
                            "title":"☎ Numéro de contact",
                            "payload":"+27887889"
                        }
                    ]
                }
            }
        };
        await sendMessage(sender_id, response2);
    } catch (e) {
        console.log(e);
    }

};

let sendNotificationToTelegram = (user) => {
    return new Promise(async(resolve, reject) => {
        try {
            let request_body = {
                chat_id: process.env.TELEGRAM_GROUP_ID,
                parse_mode: "HTML",
                text: `
| --- <b>A new reservation</b> --- |
| ------------------------------------------------|
| 1. Username: <b>${user.name}</b>   |
| 2. Phone number: <b>${user.phoneNumber}</b> |
| 3. Phone number: <b>${user.modele}</b> |
| 4. Phone number: <b>${user.panne}</b> |
| 5. Created at: ${user.createdAt} |
| ------------------------------------------------ |                           
      `
            };

            // Send the HTTP request to the Telegram
            request({
                "uri": `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
    sendServiceList: sendServiceList,
    handleDeposRep:handleDeposRep,
    demanderReperation:demanderReperation,
    sendMessageAskingPhoneNumber:sendMessageAskingPhoneNumber,
    sendMessageAskingModele:sendMessageAskingModele,
    sendMessageAskingPanne:sendMessageAskingPanne,
    goBackToServiceList  :goBackToServiceList ,
    sendNotificationToTelegram:sendNotificationToTelegram,
    sendMessageDoneDeposerReperation:sendMessageDoneDeposerReperation
}
