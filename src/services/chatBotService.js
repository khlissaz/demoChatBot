import request from "request";
require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let  getFacebookUsername = (sender_psid) => {
    return new Promise(function(resolve, reject) {
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
            let response_first = { "text": "سلام " + username+"، كيفاه نجمو نعاونوك؟" };
            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Is this the right picture?",
                            "subtitle": "Tap a button to answer.",
                            "image_url": "https://www.trustit.tn/assets/img/logo.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Yes!",
                                    "payload": "yes",
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

module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer

}
