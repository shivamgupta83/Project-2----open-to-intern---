const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');

const nameReg = /^[a-zA-Z]+$/
const modileTest= /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/
const emailTest=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

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

    const name1 = nameReg.test(name)
    const collegeName1 = nameReg.test(collegeName)
    if (name1 == false || collegeName1 == false) {
      return res.status(400).send({ msg: "Special characters are not allowed in firstName and lastName" }) }
    
    
     let  modileTest1 = modileTest.test(mobile)
     if (!modileTest1){ res.status(400).send({status:false ,data:"mobile no is not correct" }) }

    let checkmobile = await internModel.findOne({mobile:mobile})
    if(checkmobile) 
    return res.status(400).send({status:false,msg:"Mobile no is registered"});

    let  emailTest1 = emailTest.test(email)
    if (!emailTest1){ res.status(400).send({status:false ,data:"email no is not correct" }) }

    let checkemail = await internModel.findOne({email:email})
    if(checkemail) 
    return res.status(400).send({status:false,msg:"email is registered"});

    let CheckCollegeName = await collegeModel.findOne({name:collegeName})             // Checking with name not by fullname of college
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

