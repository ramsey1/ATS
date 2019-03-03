const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let loginSchema = new Schema({
    token: { type: String },
    expiring_time: { type: String },
    u_id: { type: Number },
    is_active: { type: Boolean }
})



module.exports = mongoose.model('Login', loginSchema);