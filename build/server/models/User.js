"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const userSchema = new mongoose_1.Schema({
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
    return bcrypt_1.hashSync(password, 10);
};
userSchema.methods.validatePassword = function (password) {
    console.log('validate', this);
    return bcrypt_1.compareSync(password, this.password);
};
exports.default = mongoose_1.model('User', userSchema);
