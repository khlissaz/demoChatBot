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
let sendResponseWelcomeNewCustomer = (sender_psid) => {
    return new Promise(async (resolve, reject) => {

        try {

            let username = await getFacebookUsername(sender_psid);

            let response_first = {
                "text": "Bonjour " + username + ", comment pouvons-nous vous aider exactement ? ",

            }

            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Trust-it Tunisie ",
                            // "subtitle": "Trust-it est le 1er réseau des réparateurs de confiance en Tunisie",
                            "image_url": "https://www.trustit.tn/assets/img/logo.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Demandez service",
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
            console.log(+ resolve);
            resolve("done!")
        } catch (e) {
            console.log(e);
            reject(e);
        }


    });

};

let sendResponseWelcomeNewCustomerAr = (sender_psid) => {
    return new Promise(async (resolve, reject) => {

        try {

            let username = await getFacebookUsername(sender_psid);

            let response_first = {
                "text": "سلام " + username + "، كيفاه نجمو نعاونوك؟  ",

            }


            let response_second = {

                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Trust-it Tunisie ",
                            //"subtitle": "Trust-it est le 1er réseau des réparateurs de confiance en Tunisie",
                            "image_url": "https://www.trustit.tn/assets/img/logo.png",
                            "text": " نوع الخدمة ",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "نوع الخدمة",
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
            console.log(+ resolve);
            resolve("done!")
        } catch (e) {
            console.log(e);
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
                            "title": "Nos Services",
                            "subtitle": "Trust-it est le 1er réseau des réparateurs de confiance en Tunisie",
                            "image_url": "https://technews.tn/wp-content/uploads/2017/10/19748525_821812157979095_3809731018428817001_n.jpg",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Demander réparation",
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

let sendServiceListAr = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Nos Services",
                            "subtitle": "Trust-it est le 1er réseau des réparateurs de confiance en Tunisie",
                            "image_url": "https://technews.tn/wp-content/uploads/2017/10/19748525_821812157979095_3809731018428817001_n.jpg",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": " نحب نصلح ",
                                    "payload": "DEMANDER_REPARATION",
                                },
                               

                                {

                                    "type":"web_url",
                                    "url":"https://www.facebook.com/VendoTN/",
                                    "title": "نحب نشري",

                                },
                                {
                                    "type": "postback",
                                    "title": "نعدي ميساج",
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
                             "image_url": "https://statics.trustit.tn/categories/1589644098457.png",
                             "buttons": [
                                 {
                                     "type": "postback",
                                     "title": "Réparation Smartophone",
                                     "payload": "SMARTPHONE",
                                 }
                             ],
                         },
                         {
                             "title": "Service aux utilisateurs de Smartphones, Laptops et Consoles de jeux pour des réparations de confiance grâce à un réseau de réparateurs compétents sur tout le territoire Tunisien",
                             // "subtitle": "Votre service est notre objectif",
                             "image_url": "https://statics.trustit.tn/categories/1589646812987.png",
                             "buttons": [
                                 {
                                     "type": "postback",
                                     "title": "Réparation Ordinateur",
                                     "payload": "ORDINATEUR",
                                 }
                             ],
                         },
                         {
                             "title": "Service aux utilisateurs de Smartphones, Laptops et Consoles de jeux pour des réparations de confiance grâce à un réseau de réparateurs compétents sur tout le territoire Tunisien",
                             // "subtitle": "Votre service est notre objectif",
                             "image_url": "https://technews.tn/wp-content/uploads/2017/10/20376077_835954156564895_5452148611624838675_n.png",
                             "buttons": [
                                 {
                                     "type": "postback",
                                     "title": "Réparation Imprimante",
                                     "payload": "IMPRIMANTE",
                                 }
                             ],
                         },
                         {
                             "title": "Service aux utilisateurs de Smartphones, Laptops et Consoles de jeux pour des réparations de confiance grâce à un réseau de réparateurs compétents sur tout le territoire Tunisien",
                             // "subtitle": "Votre service est notre objectif",
                             "image_url": "https://statics.trustit.tn/categories/1589647269245.png",
                             "buttons": [
                                 {
                                     "type": "postback",
                                     "title": "Réparation console de jeux",
                                     "payload": "CONSOLE",
                                 }
                             ],
                         }
                         ]
                     }
                 }
             };

};

let demanderReperationAr = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "خدمة لمستخدمي الهواتف الذكية وأجهزة الكمبيوتر المحمولة وأجهزة الألعاب لإجراء إصلاحات موثوقة بفضل شبكة من المصلحين المختصين في جميع أنحاء التراب التونسي",
                            // "subtitle": "Votre service est notre objectif",
                            "image_url": "https://statics.trustit.tn/categories/1589644098457.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "نصلح هاتف جوال",
                                    "payload": "SMARTPHONE",
                                }
                            ],
                        },
                        {
                            "title": "خدمة لمستخدمي الهواتف الذكية وأجهزة الكمبيوتر المحمولة وأجهزة الألعاب لإجراء إصلاحات موثوقة بفضل شبكة من المصلحين المختصين في جميع أنحاء التراب التونسي",
                            // "subtitle": "Votre service est notre objectif",
                            "image_url": "https://statics.trustit.tn/categories/1589646812987.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "نصلح حاسوب",
                                    "payload": "ORDINATEUR",
                                }
                            ],
                        },
                        {
                            "title": "Service aux utilisateurs de Smartphones, Laptops et Consoles de jeux pour des réparations de confiance grâce à un réseau de réparateurs compétents sur tout le territoire Tunisien",
                            // "subtitle": "Votre service est notre objectif",
                            "image_url": "https://technews.tn/wp-content/uploads/2017/10/20376077_835954156564895_5452148611624838675_n.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "نصلح ألة طباعة",
                                    "payload": "IMPRIMANTE",
                                }
                            ],
                        },
                        {
                            "title": "خدمات لمستخدمي الهواتف الذكية وأجهزة الكمبيوتر المحمولة وأجهزة الألعاب لإجراء إصلاحات موثوقة بفضل شبكة من المصلحين المختصين في جميع أنحاء التراب التونسي",
                            // "subtitle": "Votre service est notre objectif",
                            "image_url": "https://statics.trustit.tn/categories/1589647269245.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "نصلح وحدة الالعاب",
                                    "payload": "CONSOLE",
                                }
                            ],
                        }
                        ]
                    }
                }
            };

            //send a welcome message
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let handleDeposRep = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            //let username= await getFacebookUsername(sender_psid);
            let response = { "text": "Veuillez maintenant nous informer le modele de votre terminal." };

            await sendMessage(sender_psid, response);

        } catch (error) {
            reject(error)
        }
    });
}
let handleDeposRepAr = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            //let username= await getFacebookUsername(sender_psid);
            let response = { "text": "اعطينا شنوه نوع جهازك" };




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
let sendMessageAskingPhoneNumberAr = (sender_psid) => {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "اعطينا نمروك باش نتصلو بيك",
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
    return new Promise(async (resolve, reject) => {
        try {

            //let username= await getFacebookUsername(sender_psid);
            let response = { "text": "Veuillez maintenant nous préciser la panne." };


            await sendMessage(sender_psid, response);
            console.log('787878panne sent!')
        } catch (error) {
            console.log('panne no sent"Unable to send panne!')
            reject(error)
        }
    });
};
let sendMessageAskingPanneَAr = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            //let username= await getFacebookUsername(sender_psid);
            let response = { "text": "شنوه اللي تحب تصلحو" };


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
            console.log(res + "---------" + body)
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

let sendMessageAskingLocation = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            //let username= await getFacebookUsername(sender_psid);
            let response = { "text": "Merci de nous indiquer votre adresse." };


            await sendMessage(sender_psid, response);
            console.log('adress sent!')
        } catch (error) {
            console.log('adresse no sent"Unable to send panne!')
            reject(error)
        }
    });
}

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
let sendMessageDoneDeposerReperation = async (sender_id) => {
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
                            "title": "Demander service",
                            "payload": "Demander_service"
                        },
                        {
                            "type": "phone_number",
                            "title": "☎ Numéro de contact",
                            "payload": "+21627887889"
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

let sendMessageDoneDeposerReperationAr = async (sender_id) => {
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
                    "text": ` خدمة يتصلو  بك خدمة العملاء في أقرب وقت ممكن ${username} شكرا`,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Demander service",
                            "payload": "Demander_service"
                        },
                        {
                            "type": "phone_number",
                            "title": "☎ Numéro de contact",
                            "payload": "+21627887889"
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



let sendMessageDoneAvis = async (sender_id) => {
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
                    "text": `Bien reçu! \nLe service client va traiter votre avis ${username}.\n \nSouhaitez-vous consulter notre liste de services?`,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Demander service",
                            "payload": "Demander_service"
                        },
                        {
                            "type": "phone_number",
                            "title": "☎ Numéro de contact",
                            "payload": "+21627887889"
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
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                chat_id: process.env.TELEGRAM_GROUP_ID,
                parse_mode: "HTML",
                text: `
| --- <b>A new reservation</b> --- |
| ------------------------------------------------|
| 1. Username: <b>${user.name}</b>   |
| 2. Phone number: <b>${user.phoneNumber}</b> |
| 3. Modele: <b>${user.modele}</b> |
| 4. Panne: <b>${user.panne}</b> |
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




let achatProduit = (sender_psid) => {
    return new Promise(async (resolve, reject) => {

        try {
            // let response_first = { "text": "سلام " + username + "، كيفاه نجمو نعاونوك؟ /g Comment pouvons-nous vous aider exactement ? " };
            //let username = await getFacebookUsername(sender_psid);
            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Bonjour, pour l'achat et la vente verfiez avec Vendo https://www.facebook.com/VendoTN/ ",
                            //"url": "https://www.facebook.com/VendoTN/",
                            "image_url": "https://statics.trustit.tn/categories/1598692858621.jpg",
                            "buttons": [
                                {
                                    "type": "web_url",
                                    "title": "Demandez service",
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
let avisClient = (sender_psid) => {
    return new Promise(async (resolve, reject) => {

        try {

            let response = {

                "text": "Si vous êtes satisfait de notre service, pourriez vous faire une recommandation ou donner votre avis sur notre page Facebook?/n Votre témoignage nous aide à améliorer nos offres et services /n https://www.facebook.com/pg/TrustiTunisie/reviews/",
            };

            //send a welcome message
            // await sendMessage(sender_psid, response_first);

            //send a image with button view main menu
            await sendMessage(sender_psid, response);
            console.log("/////" + resolve);
            resolve("done!")
        } catch (e) {
            console.log("/////" + e);
            reject(e);
        }


    });



    /* // Send the HTTP request to the Messenger Platform
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
     */
};
let sendLookupUser = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = templateMessage.sendLookupUserTemplate();
            await sendMessage(sender_psid, response)
            resolve("done")
        }
        catch (e) {
            reject(e)

        }
    })
}


let sendInfoUserWebView = (sender_psid) => {
    return new Promise(async(resolve, reject) => {
        try {
            let respose=templateMessage.
            resolve("done")

        } catch(error) {
            reject(error);

        }

    });

}
module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
    sendResponseWelcomeNewCustomerAr: sendResponseWelcomeNewCustomerAr,
    sendServiceList: sendServiceList,
    sendServiceListAr: sendServiceListAr,
    handleDeposRep: handleDeposRep,
    handleDeposRepAr: handleDeposRepAr,
    demanderReperation: demanderReperation,
    demanderReperationAr: demanderReperationAr,
    sendMessageAskingPhoneNumber: sendMessageAskingPhoneNumber,
    sendMessageAskingPhoneNumberAr: sendMessageAskingPhoneNumberAr,
    sendMessageAskingModele: sendMessageAskingModele,
    sendMessageAskingPanne: sendMessageAskingPanne,
    sendMessageAskingPanneَAr: sendMessageAskingPanneَAr,
    sendMessageAskingLocation: sendMessageAskingLocation,
    goBackToServiceList: goBackToServiceList,
    sendNotificationToTelegram: sendNotificationToTelegram,
    sendMessageDoneDeposerReperation: sendMessageDoneDeposerReperation,
    sendMessageDoneDeposerReperationAr: sendMessageDoneDeposerReperationAr,
    achatProduit: achatProduit,
    avisClient: avisClient,
    sendMessageDoneAvis: sendMessageDoneAvis,
    sendLookupUser: sendLookupUser,
    sendInfoUserWebView: sendInfoUserWebView
}
