import { Schema, model, Document, Model } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';


const userSchema = new Schema({
    isVerifed: {
        type: Boolean,
        required: true,
    },
    providerId: {
        type: String,
        required: false,
    },
    provider: {
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    login: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    }
});

userSchema.methods.generateHash = function (password) {
    return hashSync(password, 10);
};
userSchema.methods.validatePassword = function(password) {
    console.log('validate', this);
    return compareSync(password, this.password);
};

export default model('User', userSchema);
