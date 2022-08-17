const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    }
});

UserSchema.plugin(uniqueValidator); // checking for duplicate data entries

UserSchema.pre('save', function(next){ //altering record before saving in the database
    const user = this; //fetching the user
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})
    
// export model
const User = mongoose.model('User',UserSchema);
module.exports = User