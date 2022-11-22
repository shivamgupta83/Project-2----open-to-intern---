const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');

const nameReg = /^[a-zA-Z]+$/
const modileTest = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/
const emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const interns = async function (req, res) {
    try {
        let { name, mobile, email, collegeName } = req.body;

        if (!Object.keys(req.body).length > 0)
            return res.status(400).send({ status: true, msg: "Please pass any data" })

        if (!name || name == "")
            return res.status(400).send({ status: true, msg: "Please provide name" })
            
            if (!email || email == "")
                return res.status(400).send({ status: false, msg: "Please provide email" })

        if (!mobile || mobile == "")
            return res.status(400).send({ status: false, msg: "Please provide mobille number" })

        if (!collegeName || collegeName == "")
            return res.status(400).send({ status: false, msg: "Please provide collegeName" })

        const name1 = nameReg.test(name)
        const collegeName1 = nameReg.test(collegeName)
        if (name1 == false || collegeName1 == false) {
            return res.status(400).send({ msg: "Special characters are not allowed in firstName and lastName" })
        }

        let emailTest1 = emailTest.test(email)
        if (!emailTest1) { res.status(400).send({ status: false, data: "email no is not correct" }) }



        let checkemail = await internModel.findOne({ email: email })
        if (checkemail)
            return res.status(400).send({ status: false, msg: "email is registered" });

        let checkmobile = await internModel.findOne({ mobile: mobile })
        if (checkmobile)
            return res.status(400).send({ status: false, msg: "Mobile no is registered" });

        let CheckCollegeName = await collegeModel.findOne({ name: collegeName })             // Checking with name not by fullname of college
        if (!CheckCollegeName)
            return res.status(400).send({ status: false, msg: "No similar college found" });

        let collegeId = CheckCollegeName._id

        let createdata = await internModel.create({ name, mobile, email, collegeId })
        return res.status(201).send({ status: true, msg: createdata })

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.interns = interns;































// const collegeModel = require('../models/collegeModel');
// const internModel=require('../models/internModel')


// const isValid = function (value) {
//     if (typeof value === "string" && value.trim().length === 0) return false
//     if (typeof value === "undefined" || value === null) return false
//     return true;
// };

// const isValidName = function (name) {
//     return /^[A-Za-z\s]{1,15}$/
//     .test(name)
// }
// const isValidShortName=function(name){
//     if(/^[a-z]{2,20}$/i.test(name)){
//         return true
//     }
// }
// const validateEmail = function (email) {
//     return (/^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/).test(email)

// }
// const isValidMobile=function(mobile){
//     if(/^[0-9]\d{9}$/.test(mobile)){
//         return true
//     }
// }


// const createIntern =async function(req,res){
//     try {
//         const data=req.body
//         let { name, mobile, email, collegeName}=data
//         if (Object.keys(data).length == 0) {
//             return res.status(400).send({ status: false, msg: "Data is required for Blog Creation" });
//           }
//         if(!isValid(name)){
//             return res.status(400).send({ status: false, msg: "Name is required" });
//         }   
//         if(!isValidName(name)){
//             return res.status(400).send({ status: false, msg: "Name should be contain alphabets only" });

//         }
//         if(!isValid(mobile)){
//             return res.status(400).send({ status: false, msg: "mobile is required" });
//         }   
//         if(!isValidMobile(mobile)){
//             return res.status(400).send({ status: false, msg: "Mobile should be contains only numbers" });

//         }
//         let validMobile =await internModel.findOne({mobile:mobile, isDeleted:false})
//         if(validMobile){
//             return res.status(400).send({status:false,msg:"Please provide unique mobile Number"})
//         }
//         if(!isValid(email)){
//             return res.status(400).send({ status: false, msg: "Email is required" });
            
//         }
//         if(!validateEmail(email)){
//             return res.status(400).send({ status: false, msg: "Please enter a valid email" });
            
//         }
//         let mail =await internModel.findOne({email:email, isDeleted:false})
//         if(mail){
//             return res.status(400).send({status:false,msg:"This email already register"})
//         }
//         if(!isValid(collegeName)){
//             return res.status(400).send({ status: false, msg: "college name is required" });
//         }   
//         if(!isValidShortName(collegeName)){
//             return res.status(400).send({ status: false, msg: "Please enter a valid college name" });

//         }
//         let unique =await collegeModel.findOne({collegeName:collegeName.toLowerCase(), isDeleted:false})
//         if(!unique){
//             return res.status(400).send({ status: false, msg: "College not found" });

//         }
//         data["collegeId"]  = unique["_id"]
//         let create= await internModel.create(data)
//         return res.status(201).send({status:true, msg:create})

        
//     } catch (error) {
//         return res.status(500).send({status:false,msg:error.message})
        
//     }
// }

// module.exports={createIntern}



















