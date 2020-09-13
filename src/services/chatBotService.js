import request from "request";
require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let  getFacebookUsername = (sender_psid) => {
    return new Promise( (resolve, reject)=> {
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
                    console.log("*******"+username)
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
    return new Promise(async (resolve, reject)=> {

        try {
            let response_first = { "text": "سلام " +username+"، كيفاه نجمو نعاونوك؟ \n Comment pouvons-nous vous aider exactement ? " };
            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Trust-it est le 1er réseau des réparateurs de confiance en Tunisie",
                            "subtitle": "Votre service est notre objectif",
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
            await sendMessage(sender_psid, response_first);

            //send a image with button view main menu
            await sendMessage(sender_psid, response_second);
            console.log("/////"+resolve);
            resolve("done!")
        } catch (e) {
            reject(e);
        }


    });

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

let sendMainMenu= (sender_psid)=>{
return new Promise(async(resolve,reject)=>{
try {
    let response= {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Nos services?",
                    "subtitle": "Cliquez sur le bouton pour obtenir la reponse.",
                    "image_url": "https://www.trustit.tn/assets/img/logo.png",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Deposer une réparation",
                            "payload": "REPARATION",
                        },

                        {
                            "type": "postback",
                            "title": "Acherter un produit",
                            "payload": "PRODUIT",
                        },
                        {
                            "type": "postback",
                            "title": "Donner un avis/ reclamtion",
                            "payload": "AVIS/RECLAMATION",
                        },
                        {
                            "type": "postback",
                            "title": "Connecter notre service",
                            "payload": "GO_SERVICE",
                        },

                    ],
                },

                {
                    "title": "Horaire du travail",
                    "subtitle": "Lundi-Vendredi 8:00AM - 00:00AM /n Samedi-Dimanche 10:00 - 12:00PM " ,
                    "image_url": "https://www.trustit.tn/assets/img/logo.png",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Contacter notre service",
                            "payload": "Go",
                        },

                    ],
                },
                {
                    "title": " Acherter un produit",
                    "subtitle": " un produit",
                    "image_url": "https://www.trustit.tn/assets/img/logo.png",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "SHOW ROOMS",
                            "payload": "SHOW_ROOMS",
                        },

                    ],
                }
            
            
            
            
            ]

            }
        }
    };

    //send a welcome message
    await sendMessage(sender_psid, response);
} catch (error) {
    reject(error);
}
});
};



module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
    sendMainMenu:sendMainMenu
}
