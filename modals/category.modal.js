import mongoose from 'mongoose'



const categorySchema = mongoose.Schema({
  


    title: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('categories', categorySchema);


export default Category