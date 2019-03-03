const express = require('express');
const router = express.Router();

jobController = require('../controllers/jobs.controller');

router.get('/',(req,res)=> jobController.getJobs(req,res));

// router.get('/',(req,res)=>{
//     res.send('working');
// })

router.post('/', (req,res)=>jobController.jobPost(req,res));

module.exports = router;