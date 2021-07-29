import express from 'express'



import multer from 'multer';

import Admin from '../modals/login.modal.js';

const router1 = express.Router();


let upload = multer();


router1.route('/login').post(upload.fields([]),(req1, res1) => {
 

    const email = req1.body.email;
    const password = req1.body.password;

    const query = {
        "$and": [
          { "email": { "$eq": email } },
          { "password": { "$eq": password } }
        ]
      }
   
    
  

      Admin.findOne(query, function (err, docs) {
        if (err){
            //console.log(err)
            res1.status(400).json('Error: ' + err);
        }
        else{

          if(docs==null){

            res1.status(203).json(docs);
          }else{


            res1.status(200).json(docs);
          }
          

        
           
        }
    });

});

export default router1