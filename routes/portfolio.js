import express from 'express'

import multer from 'multer';
import fs from 'fs';

import path from 'path';
import Portfolio from '../modals/portfolio.modal.js';



const router = express.Router();

router.route('/records').get( (req1, res1) => {
 


    Portfolio.find({}, function(err, docs) {
        if (err) {
            res1.status(400).json('Error: ' + err);
        } else {
            res1.status(200).json(docs);

            
        }
    })
  

});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.route('/add').post(upload.single('photo'), (req, res) => {

    const title = req.body.title;
    const category = req.body.category;
    

    const newUserData = {
        title,
        category,
      
    }

    if(req.file!= undefined){
        const photo = req.file.filename;
        newUserData.photo=photo;

    }

    const newUser = new Portfolio(newUserData);

    newUser.save()
           .then(() => res.json('Portfolio Added'))
           .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/update').post(upload.single('photo'), (req, res) => {

    console.log(req.body);
    const ids = req.body.id;
    const title = req.body.title;
    const oldphoto = req.body.oldphoto;
    const category = req.body.category;
  
    const newUserData = {
        title,
        category
        
    }

  
    if(req.file!= undefined){

        fs.unlinkSync(`images/${oldphoto}`);

      

      

        

        const photo = req.file.filename;
        newUserData.photo=photo;

    }

    

        Portfolio.updateOne(  { _id:ids} , { $set: newUserData })
           .then(() => res.json('Portfolio Updated'))
           .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/delete').post(upload.single('photo'), (req, res) => {

    const ids = req.body.id;
    const oldphoto = req.body.oldphoto;
 
  

  
    if(oldphoto!= undefined){

        fs.unlinkSync(`images/${oldphoto}`);
    }

    

        Portfolio.deleteOne(  { _id:ids})
           .then(() => res.json('Portfolio Deleted'))
           .catch(err => res.status(400).json('Error: ' + err));
});






export default router