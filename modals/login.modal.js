import mongoose from 'mongoose'



const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
      
    }, 


    password: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('a_user', userSchema);


export default Admin