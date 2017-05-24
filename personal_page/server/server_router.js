"use strict";
var contacts = require(process.cwd()+"/personal_page/server/db_models_contact.js")
module.exports=function(app){
    app.post("/api/contact", recordContact);
    
    function recordContact(req,res,next){
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var newContact = new contacts();
    newContact.name = name;
    newContact.email = email;
    newContact.message = message;
    newContact.save(function(err,result){
        if(err){
            throw err;
        }
        console.log(result);
    });
    res.send("You have been recorded");
}
};