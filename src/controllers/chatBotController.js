import request from "request";
require("dotenv").config();
import chatBotService from "../services/chatBotService";

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let user = {
  name: "",
  phoneNumber: "",
  time: "",
  createdAt: ""
};

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


let handleMessageWithEntities = (message) => {
  let entitiesArr = ["datetime", "phone_number"];
  let entityChosen = "";
  let data = {
    "get_started": {
      "payload": "GET_STARTED"
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
  entitiesArr.forEach((name) => {
    let entity = firstEntity(message.nlp, name);
    if (entity && entity.confidence > 0.8) {

      entityChosen = name;
      data.value = entity.value;

    }
  });
  data.name = entityChosen;
  console.log("------------");
  console.log(data);
  console.log("------------");
  return data;
}
function firstEntity(nlp, name) {
  return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}
// Handles messages events
let handleMessage = async (sender_psid, message) => {
  //checking quick reply
  if (message && message.quick_reply && message.quick_reply.payload) {
      if (message === "" ) {
          //asking about phone number
          

          await chatBotService.sendMessageAskingPhoneNumber(sender_psid);
          return;
      }
      // pay load is a phone number
      if (message.quick_reply.payload !== " ") {
          //done a reservation
          // npm install --save moment to use moment
          user.phoneNumber = message.quick_reply.payload;
          user.createdAt = moment(Date.now()).zone("+07:00").format('MM/DD/YYYY h:mm A');
          //send a notification to Telegram Group chat by Telegram bot.
          await chatBotService.sendNotificationToTelegram(user);

          // send messages to the user
          await chatBotService.sendMessageDoneReserveTable(sender_psid);
      }
      return;
  }

  //handle text message
  let entity = handleMessageWithEntities(message);

  if (entity.name === "datetime") {
      //handle quick reply message: asking about the party size , how many people
      user.time = moment(entity.value).zone("+07:00").format('MM/DD/YYYY h:mm A');
  
  } else if (entity.name === "phone_number") {
      //handle quick reply message: done reserve table

      user.phoneNumber = entity.value;
      user.createdAt = moment(Date.now()).zone("+07:00").format('MM/DD/YYYY h:mm A');
      //send a notification to Telegram Group chat by Telegram bot.
  // await chatBotService.sendNotificationToTelegram(user);

      // send messages to the user
     // await chatBotService.sendMessageDoneReserveTable(sender_psid);
  } else {
      //default reply
  }

  //handle attachment message
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
      let username = chatBotService.getFacebookUsername (sender_psid);
      user.name = username;
      //send welcome response to users
       chatBotService.sendResponseWelcomeNewCustomer(user.name, sender_psid);
      break;
    case "Demander_service":
      //send service list to users
      chatBotService.sendServiceList(sender_psid).then(function (res) { console.log(res) });

      break;
    case "DEPOSER_REPARATION":
      chatBotService.deposerReperation(sender_psid);
      break;
    case "SMARTPHONE":
      chatBotService.handleDeposRep(sender_psid);
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