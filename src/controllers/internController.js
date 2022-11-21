const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');

const interns = async function(req,res){
   try{
    let { name, mobile, email, collegeName  } = req.body;

    if(! Object.keys(req.body).length > 0)
    return res.status(400).send({status:true,msg:"Please pass any data"})

    if(!name || name =="")
    return res.status(400).send({status:true,msg:"Please provide name"})

    if(!mobile || mobile =="")
    return res.status(400).send({status:false,msg:"Please provide mobille number"})

    if(!email || email =="")
    return res.status(400).send({status:false,msg:"Please provide email"}) 

    if(!collegeName || collegeName=="")
    return res.status(400).send({status:false,msg:"Please provide collegeName"})


    let checkmobile = await collegeModel.find({mobile:mobile})
    if(checkmobile) 
    return res.status(400).send({status:false,msg:"Mobile no is registered"});


    let checkemail = await collegeModel.find({email:email})
    if(checkemail) 
    return res.status(400).send({status:false,msg:"email is registered"});

    let CheckCollegeName = await collegeModel.find({name:collegeName})             // Checking with name not by fullname of college
    if(!CheckCollegeName) 
    return res.status(400).send({status:false,msg:"No similar college found"});

    let collegeId = CheckCollegeName._id

    let createdata = await internModel.create({ name, mobile, email, collegeId })
    return res.status(201).send({status:true,msg:createdata})

}  
catch(error){
    return res.status(500).send({status:false,msg:error.message})
} 
}


module.exports.interns = interns;