import request from "request";
require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
let setUpMessengerPlatform = ( PAGE_ACCESS_TOKEN) => {
    return new Promise((resolve, reject) => {
        try {

            let data = {
                "get_started": {
                    "payload": "GET_STARTED"
                },

                "whitelisted_domains": [
                    "https://trustit.herokuapp.com/",

                ]

            };

            request({
                "uri": "https://graph.facebook.com/v7.0/me/messenger_profile",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": data
            }, (err, result, body) => {
                if (!err) {
                   resolve("setup done!")
                } else {
                    reject(err);
                }
            });

        } catch (error) {
reject(error);
        }
    });
};

module.exports={

    setUpMessengerPlatform:setUpMessengerPlatform,
};