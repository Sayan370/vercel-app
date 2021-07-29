import mongoose from 'mongoose'



const portfolioSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
      
    }, 
    category: {
        type: String,
        required: true
        
    },
    photo: {
        type: String,
        required: true
       
      
    }


   
});

const Portfolio = mongoose.model('portfolio', portfolioSchema);


export default Portfolio