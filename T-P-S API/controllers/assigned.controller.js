const Assigned = require('../models/assigned.model');
const Applicant = require('../models/applicant.model');
const Interviewer = require('../models/interviewer.model');
const ToBeAssigned = require('../models/to_be_assigned.model');

 function getAssignedData(req,res){
    Assigned.find({}).then((assigned)=>{
        res.send(assigned);
    })   
    
}


async function postAssignedData(req,res){
    let app = await Applicant.findOne({ email: req.body.candidateEmail }, 'fullName')
   
    let int = await Interviewer.findOne({email:req.body.interviewerEmail},'name');

    let assigned = new Assigned({
        c_email:req.body.candidateEmail,
        i_email:req.body.interviewerEmail,
        j_id: req.body.j_id,
        j_code:req.body.j_code,
        level: req.body.level,
        date: req.body.date,
        time: req.body.time,
        status: req.body.status
    });

    assigned.c_name = app.fullName;
    assigned.c_id = app._id;

    assigned.i_name = int.name;
    assigned.i_id = int._id;

    assigned.save((err)=>{
        if(err)
        throw err;
        else
        res.send(req.body);
    });


    Interviewer.findOne({email:req.body.interviewerEmail},(err,person)=>{
        person.isAvailable.push(req.body.date+req.body.time);

        person.save((err)=>{
            if(err)
            throw err;
            else
            console.log('saved')
    })
})

    ToBeAssigned.findOneAndUpdate({c_email:req.body.candidateEmail},{
        is_assigned : true
    }).then((assigned)=>{
        res.send('Updated');
    });
}

function updateAssigned(req,res){
    Assigned.findOneAndUpdate({c_email:req.body.c_email},{
        i_email:req.body.i_email,
        i_name:req.body.i_name,
        i_id: req.body.i_id,
        level: req.body.level,
        feedback:req.body.feedback,
        date: req.body.date,
        time: req.body.time,
        status: req.body.status}).then((assigned)=>{
            res.send('Updated');
        });
}

function getOneAssigned(req,res){
    Assigned.find({c_email:req.body.email}).then((assigned)=>{
        res.send(assigned);
    })
}



module.exports = {
    getAssignedData : getAssignedData,
    postAssignedData : postAssignedData,
    updateAssigned: updateAssigned,
    getOneAssigned : getOneAssigned
}