var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://mcoyle:admin@ds259085.mlab.com:59085/contact_manager', ['contacts']);

//get all contacts
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

router.post('/task', function(req, res, next){
    var contact = req.body;
    if (!contact.firstname || !contact.lastname){
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
        updContact = contact.firstName;
    }

    if (contact.lastName){
        updContact = contact.lastName;
    }

    if (contact.email){
        updContact = contact.email;
    }

    if (contact.phone){
        updContact = contact.phone;
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