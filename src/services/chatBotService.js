import request from "request";
//require ("dotenv").config();

//const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getFacebookUsername = (sender_psid) => {
    return new Promise ((resolse, reject) => {
    // Send the HTTP request to the Messenger Platform
    let uri = "https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}";

    request( {
        "uri": uri,

        "method": "GET",

    }, (err, res, body) => {
        if(!err) {
            //convert string to json
            body = JSON.parse(body);
            let username = '${body.last_name} ${body.first_name}';
            resolve(username)
        }  else {
            reject(reason+ "Unable to send message:" + err);

        }
    });
 });
};

module.exports = {
    getFacebookUsername: getFacebookUsername

}
