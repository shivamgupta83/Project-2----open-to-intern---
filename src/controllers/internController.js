const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const { isValid, nameReg , fullnameReg, logoRegex, emailTest , mobileTest } = require("../Validation/validation") 


const interns = async function (req, res) {
    try {
        let { name, mobile, email, collegeName } = req.body;


        //VALIDATION FOR EMPTY VALUES.

        if (!Object.keys(req.body).length > 0)
            return res.status(400).send({ status: true, msg: "Please pass any data" })

        if (!isValid(name))
            return res.status(400).send({ status: true, msg: "Please provide name" })
            
        if (!isValid(email))
            return res.status(400).send({ status: false, msg: "Please provide email" })

        if (!isValid(mobile))
            return res.status(400).send({ status: false, msg: "Please provide mobille number" })

        if (!isValid(collegeName))
            return res.status(400).send({ status: false, msg: "Please provide collegeName" })


        // VALIDATING REGEX ACCORDINGLY.

        if(!fullnameReg.test(name))
        return res.status(400).send({ msg: "Special characters are not allowed in Fullname" })
        
        if(!mobileTest.test(mobile))
        return res.status(400).send({ status: false, data: "mobile no is not correct" }) 

        if(!emailTest.test(email))
        return res.status(400).send({ status: false, data: "email no is not correct" }) 

        if(!nameReg.test(collegeName))
        return res.status(400).send({ status: false, data: "Only lowercase characters are alloweed in college name" }) 
    
        
        // CHECKING FOR PRE EXISTING DATA.

        let checkMobileandEmail = await internModel.findOne({ $or:[ {mobile: mobile} , {email:email}] })
        if (checkMobileandEmail)
            return res.status(400).send({ status: false, msg: "Mobile no or email Id is already registered." });

        let CheckCollegeName = await collegeModel.findOne({ name: collegeName })             
        if (!CheckCollegeName)
            return res.status(400).send({ status: false, msg: "No similar college found" });

        let collegeId = CheckCollegeName._id

        // CREATING NEW INTERN DATA WITH GIVEN AND VERIFIED INFORMATION.

        let createdata = await internModel.create({ name, mobile, email, collegeId })
        return res.status(201).send({ status: true, msg: createdata })

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.interns = interns;

