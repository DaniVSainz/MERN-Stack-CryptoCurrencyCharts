const User = require('./user');
const mongoose = require('mongoose');

const VerificationToken =  mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

const Token = module.exports = mongoose.model('VerificationToken', VerificationToken);
