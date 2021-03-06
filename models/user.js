const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/upload/users/avatars');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friendship: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Friendship'
    },
    avatar: {
        type: String,
    }
}, {
    timestamps: true
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});


UserSchema.statics.uploadAvatar = multer({ storage: storage }).single('avatar');
UserSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', UserSchema);
module.exports = User;