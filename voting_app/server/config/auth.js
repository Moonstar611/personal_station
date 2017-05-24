/* 
 * Configure the user authorization
 */
"use strict";

module.exports = {
    "twitter": {
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        callbackURL: "http://www.explorerqiaochu.com/voting_app/auth/twitter/callback"
    }
    
};


