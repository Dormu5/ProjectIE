const ContactForm = require('../models/contactForm');
const nodemailer = require('nodemailer');
const next = require("mongodb");
const mongoose = require('mongoose');

export default{
    async contactForm(req, res, next){
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'footballscoressup@gmail.com',
                pass: 'Support1'
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'footballscoressup@gmail.com', // sender address
            to: req.body.email1, // list of receivers
            subject: 'Node Contact Request', // Subject line
            text: 'test from nodemailer', // plain text body
            html:' We have received your message. We will contact you as soon as possible.' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err);
            else
                console.log(info);
        });


        if (req.body.name1 &&
            req.body.email1 &&
            req.body.message1) {

            let contactForm = {
                email: req.body.email1,
                username: req.body.name1,
                message: req.body.message1

            };

            ContactForm.create(contactForm, function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    res.send('Successfully added!');
                }
            });

        }
        else {
            let err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }
    },
    async contact(req, res, next){
        res.send('You are on a contact page');
    },
    async remove(req, res){
        console.log(req.body.messageId)
        ContactForm.findByIdAndRemove(req.body.messageId,   (err) => {
            if(err){
                return res.send('Something was wrong!');
            }
            else{
                res.send('Successfully deleted');
            }
        })
    },
    async readAllMessages(req, res){
        ContactForm.find({}, (err, messages) =>{
            if(err){
                res.send(err);
            }
            else{
                res.end(JSON.stringify(messages))
            }
        })
    },

    async update(req, res){
        console.log(req.body.messageId)
        console.log(req.body.email)
        console.log(req.body.username)
        console.log(req.body.message)
        ContactForm.findByIdAndUpdate({_id: req.body.messageId}, req.body).then(() =>{
                ContactForm.findOne({_id: req.body.messageId}).then((message) =>{
                    console.log("ok")
                    res.send("ok")
                })
        }).catch((err) =>{
            console.log("not ok")
            res.send(err)
        })
    }

}
