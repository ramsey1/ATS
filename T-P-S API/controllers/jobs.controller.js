const Jobs = require('../models/job.model');

function jobPost(req, res) {
    let jobs = new Jobs({
        id: req.body.id,
        job_code: req.body.jobCode,
        job_profile: req.body.jobProfile,
        jod_description: req.body.jobDesc,
        vacancies: req.body.vacancies,
        base_sal: req.body.baseSal,
        enrollment_type: req.body.enrollType,
        experience_req: req.body.expReq,
        job_location: req.body.jobLoc,
        skills_req: req.body.skillsReq,
        educational_req: req.body.eductReq,
        aplied_cnt: req.body.applCnt,
        is_active: req.body.isActive
    });

    jobs.save((err) => {
        if (err)
            console.log('Job Post Error ->', err);
        else
            res.send(req.body);
    });
}

function getJobs(req,res){
    Jobs.find({}).then((jobs)=>{
        res.send(jobs);
    });
}

module.exports = {
    jobPost: jobPost,
    getJobs:getJobs
}