const Interviewer = require('../models/interviewer.model');


function postInterviewer(req,res){
let interviewer = new Interviewer({
    name:  req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
});

interviewer.save((err)=>{
if(err)
console.log(err);
else
res.send(req.body);
});

}

function getInterviewer(req,res){
    Interviewer.find({}).then((interviewers)=>{
        res.send(interviewers);
    });
}

function getOneInterviewer(req,res){
    Interviewer.findOne({email:req.body.email},'name',(err,person)=>{
        if(err)
        throw err;
        else
        res.send(person);
    });
}

module.exports = {
    postInterviewer : postInterviewer,
    getInterviewer : getInterviewer,
    getOneInterviewer : getOneInterviewer
}