const Applicant = require('../models/applicant.model');
const ToBeAssigned = require('../models/to_be_assigned.model');




function postApplicant(req, res) {
    Applicant.findOne({email:req.body.email},(err,person)=>{

        if(person){

            let appBefore = person.applyFor;
            console.log('no');
            
            for(var i=0;i<appBefore.length;i++){
                if(appBefore[i].jobCode==req.body.jobCode){
                    return;
                }
            }
            console.log(appBefore);

            
        person.applyFor.push({jobCode:req.body.jobCode,j_id:req.body.j_id});
        person.save((err)=>{
            if(err)
            throw err;
            else
            console.log('saved');
        });

        let tba = new ToBeAssigned({
            c_email: req.body.email,
            j_id: req.body.j_id,
            j_code: req.body.jobCode
        });
    
        tba.save((err, saved) => {
            if (err)
                throw err
            else
                console.log('saved')
        });
    }

    else{
       
    let applicant = new Applicant({
        fullName: req.body.fullName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        mobile: req.body.mobile,
        highSchool: req.body.highSchool,
        cgpa: req.body.cgpa,
        xii: req.body.xii,
        perc: req.body.perc,
        hgd: req.body.hgd,
        gdate: req.body.gdate,
        certifications: req.body.certifications,
        skills: req.body.skills,
        year: req.body.year,
        month: req.body.month,
        employer: req.body.employer,
        empadd: req.body.empadd,
        Eemail: req.body.Eemail,
        Ephone: req.body.Ephone,
        supervisor: req.body.supervisor,
        jtitle: req.body.jtitle,
        salary: req.body.salary,
        ehdate: req.body.ehdate,
        rfl: req.body.rfl,
        refname: req.body.refname,
        refjob: req.body.refjob,
        refcomp: req.body.refcomp,
        refphone: req.body.refphone,
        refemail: req.body.refemail,
        resFile: req.files.resFile[0].filename,
        vidFile: req.files.vidFile[0].filename,
        applyFor: [
            {
                jobCode: req.body.jobCode,
                j_id: req.body.j_id
            }
        ]

    });

    applicant.save((err, saved) => {
        if (err)
            console.log(err);
        else
            console.log(saved);
        res.send(saved);
    });

    let tba = new ToBeAssigned({
        c_email: req.body.email,
        j_id: req.body.j_id,
        j_code: req.body.jobCode
    });

    tba.save((err, saved) => {
        if (err)
            throw err
        else
            console.log('saved')
    });
        
    }


    });


}

async function getApplicant(req, res) {
    Applicant.find({}).then((applicants)=>{
        res.send(applicants);
    })     
}

function getOneApplicant(req, res) {
    Applicant.findOne({ email: req.body.email }, 'fullName', (err, person) => {
        if (err)
            return handleError(err);
        else
            res.send(person);
    })
}



module.exports = {
    postApplicant: postApplicant,
    getApplicant: getApplicant,
    getOneApplicant: getOneApplicant
}