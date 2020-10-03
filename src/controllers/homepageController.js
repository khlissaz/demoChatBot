import homepageService from "../services/homepageService";
require("dotenv").config();
const PAGE_ACCESS_TOKEN = "EAAFFseMejqcBAMKgqR9CX3nnIuM4vN5a7vmrhg9NT9bxz7a79UiQgQ45hZCcpizIHZBnYVbNQKn6ky6GY1XvqH99wxXkDWzZBAYOZBH6aTalR0Fw3ugp2IzKVM9QdZCORLiZBT9hUXXdnDOU48DacZAht2tz9xCvZCZBZCbceAOauFigZDZD";


let getHomepage = (req, res) => {
  return res.render("homepage.ejs");
};
let getFacebookUserProfile = (req, res) => {
  return res.render("profile.ejs");
}
let setUpUserFacebookProfile = async (req, res) => {
  //Send th HTTP request to the messenger Platform
  try {
    console.log(PAGE_ACCESS_TOKEN)
    await homepageService.setUpMessengerPlatform(PAGE_ACCESS_TOKEN);
    return res.status(200).json({

      message: "OK"
    });
  } catch (error) {
    return res.status(500).json({

      message: "Erreur from node server"+PAGE_ACCESS_TOKEN
    });
  }


}

module.exports = {
  getHomepage: getHomepage,
  getFacebookUserProfile: getFacebookUserProfile,
  setUpUserFacebookProfile: setUpUserFacebookProfile
};