import request from "request";
//require ("dotenv").config();

//const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getFacebookUsername = (sender_psid) => {
    return new Promise(function(resolve, reject)  {
        // Send the HTTP request to the Messenger Platform
        let uri = "https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}";

        request({
            "uri": uri,

            "method": "GET",

        }, (err, res, body) => {
            if (!err) {
                //convert string to json
                body = JSON.parse(body);
                let username = '${body.last_name} ${body.first_name}';
                resolve(username)
            } else {
                reject(reason + "Unable to send message:" + err);

            }
        });
    });
};
let sendResponseWelcomeNewCustomer = (username, sender_psid) => {
    return new Promise((resolve, reject) => {

        let response_first = { "text": "سلام {username}$، كيفاه نجمو نعاونوك؟" };
        let response_second = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": "URL HERE",
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
        sendMessage(sender_psid, response_first);

        //send a image with button view main menu
         sendMessage(sender_psid, response_second);
    });

};

let sendMessage = (sender_id, response) => {
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
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });




};

module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer

}
