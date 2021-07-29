import express from 'express'


import multer from 'multer';

import Category from '../modals/category.modal.js';

const router2 = express.Router();

let upload = multer();


router2.route('/records').get( (req1, res1) => {
 


    Category.find({}, function(err, docs) {
        if (err) {
            res1.status(400).json('Error: ' + err);
        } else {
            res1.status(200).json(docs);

            
        }
    })
  

});

router2.route('/find').post(upload.fields([]), (req2, res1) => {
 


const idcxs = req2.body.id;




    Category.findOne({ "_id": idcxs}, function(err, docs) {
       
        if (err) {
            res1.status(400).json('Error: ' + err);
        } else {
            res1.status(200).json(docs);

            
        }
    })
  

});

router2.route('/add').post(upload.fields([]), (req2, res) => {
 


const title = req2.body.title;


const newUserData = {
    title,
  
  
}

const newUser = new Category(newUserData);

newUser.save()
       .then(() => res.json('Category Added'))
       .catch(err => res.status(400).json('Error: ' + err));

  

});

router2.route('/update').post(upload.fields([]), (req2, res) => {
 


const idcxs = req2.body.id;
const title = req2.body.title;


const newUserData = {
    title
    
}


Category.updateOne(  { _id:idcxs} , { $set: newUserData })
.then(() => res.json('Category Updated'))
.catch(err => res.status(400).json('Error: ' + err));


  

});

router2.route('/delete').post(upload.fields([]), (req2, res) => {
 


const idcxs = req2.body.id;





Category.deleteOne(  { _id:idcxs})
.then(() => res.json('Category Deleted'))
.catch(err => res.status(400).json('Error: ' + err));


  

});

export default router2