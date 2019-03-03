const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let assignSchema = new Schema({
    c_id: { type: String },
    c_email:{type: String},
    c_name:{type : String},
    i_email:{type : String},
    i_name:{type: String},
    j_id: { type: String },
    i_id: { type: String },
    j_code:{type:String},
    level:{type:String,default : "Level 1"},
    date: { type: String },
    time: { type: String },
    feedback: { type: Number, default : -1 },
    status: { type: String }
})



module.exports = mongoose.model('Assign', assignSchema);