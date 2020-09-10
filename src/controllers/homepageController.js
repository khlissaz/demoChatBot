import request from "request"
require("dotenv").config();
const PAGE_ACCESS_TOKEN=process.env.PAGE_ACCESS_TOKEN;


let getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};
let getFacebookUserProfile = (req, res) => {
    return res.render("profile.ejs");
}
let setUpUserFacebookProfile = (req, res) => {
    console.log(res.PAGE_ACCESS_TOKEN)
    let data = {
        "get_started":{
            "payload":"GET_STARTED"
          },
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "Talk to an agent",
                        "payload": "CARE_HELP"
                    },
                    {
                        "type": "postback",
                        "title": "Outfit suggestions",
                        "payload": "CURATION"
                    },
                    {
                        "type": "web_url",
                        "title": "Shop now",
                        "url": "https://www.originalcoastclothing.com/",
                        "webview_height_ratio": "full"
                    }
                ]
            }
        ],

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
            console.log('message sent!');
           /* return result.status(200).json({
                message: "setup done!"
            });*/
        } else {
            console.log("Unable to send message:" +err);
          /*  return result.status(500).json({
                "message": "Error from the node server"

            });*/
        }
    });

    return res.status(200).json({

        message: "OK"
    });
}

module.exports = {
    getHomepage: getHomepage,
    getFacebookUserProfile: getFacebookUserProfile,
    setUpUserFacebookProfile: setUpUserFacebookProfile
};