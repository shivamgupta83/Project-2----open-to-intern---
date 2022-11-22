const collegeModel = require("../models/collegeModel")
const internModel=require("../models/internModel")


const { isValid, nameReg , fullnameReg, logoRegex } = require("../Validation/validation") 

const createCollege  =   async function(req,res){
   
 try{
        let data = req.body ;
       
        if (Object.keys(data).length == 0)  
        
        return res.status(400).send({ status: false, message: "Please enter the name, fullName and logoLink." });

        const { name, fullName, logoLink } = data  

        if (!isValid(name))
            return res.status(400).send({ status: false, msg: "Please provide name" })

        if (!isValid(fullName))
            return res.status(400).send({ status: false, msg: "Please provide fullName" })

        if (!isValid(logoLink))
            return res.status(400).send({ status: false, msg: "Please provide logoLink" })


        // PASSING AND CHECKING REGEX

        if (!nameReg.test(name)) {
            return res.status(400).send({ status: false, message: "Name should be in valid format" })
        }

        if (!fullnameReg.test(fullName)) {
            return res.status(400).send({ status: false, message: "fullName should be in valid format" })
        }

        if (!logoRegex.test(logoLink)) {
            return res.status(400).send({ status: false, message: "logoLink should be in valid format" });
        }

        // CREATING NEW DATA WITH ABOVE INFORMATION.

        let savedcollege = await collegeModel.create(data);
        return res.status(201).send({ status: true, data: savedcollege })

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



const listOfCollageIntern = async function (req, res) {

    try {

        let data = req.query
        let w = Object.keys(req.query)

        if (!["collegeName"].includes(...w))
        return res.status(400).send({ status: false, msg: "query can only collegeName" })


        let collegeId = await collegeModel.findOne({ name: data.collegeName })
        if (!collegeId)
        return res.status(400).send({ status: false, msg: "COLLEGE NOT FOUND GIVE RIGHT COLLEGE NAME" }) 
       
        if (collegeId.isDeleted) 
        return res.status(400).send({ status: false, msg: "COLLEGE HAS BEEN DELETED" }) 

        let internsNameWithCollege = await internModel.find({ collegeId: collegeId._id }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
       
        if (internsNameWithCollege.length == 0)
        return res.status(400).send({ status: false, msg: "NO INTERN FOUND FROM THIS COLLAGE" })

        let NewData = {
            name: collegeId.name,
            fullName: collegeId.fullName,
            logoLink: collegeId.logoLink
        }

        return res.status(200).send({ data: NewData, interns: internsNameWithCollege })

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}



module.exports = { listOfCollageIntern, createCollege }
