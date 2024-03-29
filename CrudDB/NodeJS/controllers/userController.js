const express = require("express");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

const { User } = require("../models/user");

router.get("/", (req,res) => {
    User.find((err,docs) => {
        if(!err) {
            res.send(docs);
        } else {
            console.log("Error in Retriving Users :" + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get("/:id", (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log("Error in Retriving User: " + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post("/", (req,res) =>{
    var user = new User({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    user.save((err, doc)=> {
        if(!err) {
            res.send(doc);
        } else {
            console.log("Error in User save: " + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put("/:id", (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    
    var user = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    User.findByIdAndUpdate(req.params.id, {$set: user} , {new: true}, (err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log("Error in User update: " + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete("/:id" , (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            console.log("Error in User delete :" + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;