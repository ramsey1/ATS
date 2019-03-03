const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let jobSchema = new Schema({
    id: { type: Number },
    job_code: { type: String },
    job_profile: { type: String },
    jod_description: { type: String },
    vacancies: { type: Number },
    base_sal: { type: String },
    enrollment_type: { type: String },
    experience_req: { type: String },
    job_location: { type: String },
    skills_req: { type: String },
    educational_req: { type: String },
    aplied_cnt: { type: Number },
    is_active: { type: Boolean ,default : true},
    priority: {type: Number}
})



module.exports = mongoose.model('Job', jobSchema);