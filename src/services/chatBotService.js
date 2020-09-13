import request from "request";
require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getFacebookUsername = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Send the HTTP request to the Messenger Platform
            let uri = "https://graph.facebook.com/" + sender_psid + "?fields=first_name,last_name,profile_pic&access_token=" + PAGE_ACCESS_TOKEN;

            request({
                "uri": uri,

                "method": "GET",

            }, (err, res, body) => {
                if (!err) {
                    //convert string to json
                    body = JSON.parse(body);
                    console.log(body)
                    let username = body.last_name + " " + body.first_name;
                    console.log("*******" + username)
                    resolve(username)
                } else {
                    reject("Unable to send message:" + err);

                }
            });
        } catch (error) {
            reject(error);
        }
    });
};
let sendResponseWelcomeNewCustomer = (username, sender_psid) => {
    return new Promise(async (resolve, reject) => {

        try {
           // let response_first = { "text": "سلام " + username + "، كيفاه نجمو نعاونوك؟ \n Comment pouvons-nous vous aider exactement ? " };
            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "سلام " +username.body + "، كيفاه نجمو نعاونوك؟ \n Comment pouvons-nous vous aider exactement ? ",
                            "subtitle": "Trust-it est le 1er réseau des réparateurs de confiance en Tunisie",
                            "image_url": "https://www.trustit.tn/assets/img/logo.png",
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
                                    "title": "Deposer une réparation",
                                    "payload": "DEPOSER_REPARATION",
                                },
                                {
                                    "type": "postback",
                                    "title": "Acheter un produit",
                                    "payload": "ACHETER_PRODUIT",
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

let deposerReperation = (sender_psid) => {
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
                            //"image_url": "https://www.trustit.tn/assets/img/logo.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Reparation d'un smartophone",
                                    "payload": "SMATPHONE",
                                },
                                {
                                    "type": "postback",
                                    "title": "Reparation d'un pc",
                                    "payload": "ORDINATEUR",
                                },
                                {
                                    "type": "postback",
                                    "title": "Reparation d'un console",
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
let response = {"text":"Bonjour"+username+",veuillez nous informer le modele de votre terminal."};




        await sendMessage(sender_psid, response);

    } catch (error) {
        reject(error)
    }
});
}

let sendMessageAskingPhoneNumber = (sender_id) => {
    let request_body = {
        "recipient": {
            "id": sender_id
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "Thank you. And what's the best phone number for us to reach you at?",
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

let sendMessageAskingModele = (sender_id) => {
    let request_body = {
        "recipient": {
            "id": sender_id
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
module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
    sendServiceList: sendServiceList,
    handleDeposRep:handleDeposRep,
    deposerReperation:deposerReperation,
    sendMessageAskingPhoneNumber:sendMessageAskingPhoneNumber,
    sendMessageAskingModele:sendMessageAskingModele,
    goBackToServiceList  :goBackToServiceList ,
}
