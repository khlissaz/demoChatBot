import request from "request";
import moment from "moment";
require("dotenv").config();
import chatBotService from "../services/chatBotService";

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let user = {
  name: "",
  phoneNumber: "",
  type_appareil: "",
  modele: "",
  panne: "",
  createdAt: ""
};
let ok = false;

let postWebhook = (req, res) => {

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }


    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }


};

let getWebhook = (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = MY_VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};
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
let handleMessageWithEntities = (message) => {
  let entitiesArr = ["greetings", "thanks", "bye", "phone_number", "location"];
   let entityChosen = "";
    let data = {}; // data is an object saving value and name of the entity.
    entitiesArr.forEach((name) => {
        let entity = firstEntity(message.nlp, name);
        if (entity && entity.confidence > 0.8) {
            entityChosen = name;
            data.value = entity.value;
        }
    });

    data.name = entityChosen;
    return data;
};

function firstEntity(nlp, name) {
    return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}

//handle text message
let handleMessage = async (sender_psid, message) => {

  let username = await getFacebookUsername(sender_psid);
 
  console.log(username + "#####")

  if (ok) {
    console.log(message.text + "+++++")
    console.log(user.modele + "#####++++++")
    if (message.app_id == null && user.modele == "") {
      user.modele = message.text;
      await chatBotService.sendMessageAskingPanne(sender_psid);
      user.panne = "";
      return;
    } if (message.app_id == null && user.modele !== "" && user.panne == "") {
      user.panne = message.text;
      await chatBotService.sendMessageAskingPhoneNumber(sender_psid);
      console.log(entity.nlp+"12145678932")
      return;
    } if (message.app_id == null && user.modele != "" && user.panne != "" && user.phoneNumber == "") {
      //done a reservation
      // npm install --save moment to use moment
      user.phoneNumber = message.text;
      user.createdAt = moment(Date.now()).zone("+07:00").format('MM/DD/YYYY h:mm A');
      //send a notification to Telegram Group chat by Telegram bot.
      await chatBotService.sendMessageDoneDeposerReperation(sender_psid);
      ok==false
    
      console.log(user.JSON + "9999999")
      
    }
    
  } else if (message.app_id == null && !ok) {
    // await chatBotService.sendNotificationToTelegram(user);
    await chatBotService.sendMessageDoneAvis;
  };


  //handle text message
  let entity = handleMessageWithEntities(message);
  console.log(entity+ "**++++++*****")
  console.log(message.data+ "*******")
  console.log(message.nlp.traits.object+ "*****+++++")
  /* if (entity.name === "phone_number") {
     //handle quick reply message: asking about the party size , how many people
     user.phoneNumber = entity.value;
     // console.log(user.time)
     await chatBotService.sendMessageAskingLocation(sender_psid);
   } if (entity.name === "location") {
     //handle quick reply message: done reserve table
     user.adresse = entity.value;
     user.createdAt = moment(Date.now()).zone("+07:00").format('MM/DD/YYYY h:mm A');
     //send a notification to Telegram Group chat by Telegram bot.
   }*/
  // send messages to the user
  // await chatBotService.sendMessageDoneDeposerReperation(sender_psid);

  if (entity.name === "greetings") {
    //send greetings message
    callSendAPI(sender_psid, "Bonjour , Trust-it a votre service.");
  }
  if (entity.name === "thanks") {
    //send thanks message
    callSendAPI(sender_psid, `Merci a Vous!`);
  }
  if (entity.name === "bye") {
    //send bye message
    callSendAPI(sender_psid, 'bye-bye!');
  }
  return;
};



// Handles messaging_postbacks events
let handlePostback = (sender_psid, received_postback) => {
  // let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  /* if (payload === 'yes') {
     response = { "text": "Thanks!" }
   } else if (payload === 'no') {
     response = { "text": "Oops, try sending another image." }
   }
   else if (payload === 'GET_STARTED') {
     response = { "text": "Hi there" }
   }*/

  switch (payload) {
    case "GET_STARTED":
      //get facebook username
    //  let username =  getFacebookUsername(sender_psid);
     // user.name = username;
      //console.log(username)
      //send welcome response to users
      chatBotService.sendResponseWelcomeNewCustomer(sender_psid);

      break;
    case "Demander_service":
      //send service list to users
      chatBotService.sendServiceList(sender_psid).then(function (res) { console.log(res) });

      break;
    case "DEMANDER_REPARATION":
      chatBotService.demanderReperation(sender_psid);
      user.type_appareil = payload;
      break;
    case "SMARTPHONE":
      chatBotService.handleDeposRep(sender_psid);
      ok = true;
      console.log("****" + user.modele)
      break;
    case "yes":
      response = { text: "Thank you!" };
      callSendAPI(sender_psid, response);
      break;
    case "no":
      response = { text: "Please try another image." };
      callSendAPI(sender_psid, response);
      break;
    default:
      console.log("Somthing wrong with switch case payload");
  }


  // Send the message to acknowledge the postback
  //callSendAPI(sender_psid, response);
};



// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
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
      console.log('***message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });

}
module.exports = {
  postWebhook: postWebhook,
  getWebhook: getWebhook
};