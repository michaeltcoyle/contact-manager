

var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var cors = require('cors');
var fs = require('fs');
try{
    var data = fs.readFileSync('routes/db_login.json', 'utf8');
}
catch (e){
    console.log("Please add db_login.json to contact_manager/routes for database authorization.")
    return process.exit(0);
}

    var dblogin = JSON.parse(data);



    //debug: print dblogin token to console
    //console.log(dblogin);

    var db = mongojs(dblogin.dblogin, ['contacts']);

    //get all contacts
    router.options('/contacts', cors());
    router.get('/contacts', function(req, res, next){
        db.contacts.find(function(err, contacts){
            if (err){
                res.send(err);
            }
            res.json(contacts);
        });
    });

    //get a single contact
    router.get('/contact/:id', function(req, res, next){
        db.contacts.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, contact){
            if (err){
                res.send(err);
            }
            res.json(contact);
        });
    });

    module.exports = router;

    //save contact
    router.post('/contact', function(req, res, next){
        var contact = req.body;
        if (!contact.firstName || !contact.lastName){
            res.status(400)
            res.json({
                "error": "Contact must have a name"
            });
        }  else {
            db.contacts.save(contact, function(err, contact){
                if (err){
                    res.send(err);
                }
                res.json(contact);
            });
        }
    });

    //delete contact
    router.delete('/contact/:id', function(req, res, next){
        db.contacts.remove({_id: mongojs.ObjectId(req.params.id)},function(err, contact){
            if (err){
                res.send(err);
            }
            res.json(contact);
        });
    });

    //edit contact
    router.put('/contact/:id', function(req, res, next){
        var contact = req.body;
        var updContact = {};

        if (contact.firstName){
            updContact.firstName = contact.firstName;
        }

        if (contact.lastName){
            updContact.lastName = contact.lastName;
        }

        if (contact.email){
            updContact.email = contact.email;
        }

        if (contact.phone){
            updContact.phone = contact.phone;
        }
        
        if (!updContact){
            res.status(400);
            res.json({
                "error":"Bad data; tried to edit empty contact"
            });
        } else {
            db.contacts.update({_id: mongojs.ObjectId(req.params.id)}, updContact, {}, function(err, contact){
                if (err){
                    res.send(err);
                }
                res.json(contact);
            });
        }
    
    });

