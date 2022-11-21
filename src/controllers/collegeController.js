const collegeModel = require("../models/collegeModel")
const internModel=require("../models/internModel")


const createCollege = async function(req,res){
<<<<<<< HEAD
    try{
        
        const{name,fullName,logoLink} = req.body

        if(Object.keys(req.body).length==0)
        return res.status(400).send({status :false , message : "please fill all the fields"})

        if(!name || name=="")
        return res.status(400).send({status :false, message : "please provide the name"})

        if(!fullName || fullName=="")
        return res.status(400).send({status :false, message : "please provide the fullname of the college"})

        if(!logoLink || logoLink=="")
        return res.status(400).send({status :false, message : "please provide the logoLink"})
    
        let savedcollege = await collegeModel.create({name,fullName,logoLink})
        return res.status(201).send({status :true, data : savedcollege})
=======
    try{   
         const data= req.body
        let w = Object.keys(req.query)
        if(Object.keys(req.body).length==0)
        return res.status(400).send({status :false , message : "please fill all the fields"})

if(Object.keys(req.body).length<3)  return res.status(400).send({status:false,msg:"body should all property name,fullName,logoLink "})

if(!["name","fullName","logoLink"].includes(...w)) return res.status(400).send({status:false,msg:"body should only name,fullName,logoLink"})

    
if (!/^[a-z]+$/i.test(data.name)) {
    return    res.status(400).send({ status: false, message: "Name should be in valid format" })
        ;
    }

    if (!/[a-zA-Z\s]+$/ .test(data.fullName)) {
        return   res.status(400).send({ status: false, message: "fullName should be in valid format" })
        
    }

    if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#()?&//=]*)/igm/i.test(data.logoLink)) {
        return    res.status(400).send({ status: false, message: "logoLink should be in valid format" })
            ;
        }
        
 
     const{name,fullName,logoLink} =data
     let savedcollege = await collegeModel.create({name,fullName,logoLink})
        return res.status(201).send({status : true,data : savedcollege})
>>>>>>> 57c6cbbb98e730c24cbeb60d99766c40fcac3fa9
    }
    catch(err){
        return res.status(500).send({status :false, message : err.message })
    }
}
    


const listOfCollageIntern=async function(req,res){
    let data = req.query
<<<<<<< HEAD

if(![collegeName].includes(...data)) 
return res.status(400).send({status:false,msg:"query can only collegeName"})
=======
    let w = Object.keys(req.query)
if(!["collegeName"].includes(...w)) return res.status(400).send({status:false,msg:"query can only collegeName"})
>>>>>>> 57c6cbbb98e730c24cbeb60d99766c40fcac3fa9

 
let collegeId=await collegeModel.findOne(data)

if(!collegeId)
return res.status(400).send({status:false,msg:"COLLEGE NOT FOUND GIVE RIGHT COLLEGE NAME"})

if(collegeId.isDeleted)
return res.status(400).send({status:false,msg:"COLLEGE HAS BEEN DELETED"})
 
<<<<<<< HEAD
let internsNameWithCollege= await internModel.find({collegeId:collegeId._id}).select({_id : 1,name:1,email:1,mobile:1})
=======
let internsNameWithCollege= await internModel.find({collegeId:collegeId._id}).select({_id:1,name:1,email:1,mobile:1})
>>>>>>> 57c6cbbb98e730c24cbeb60d99766c40fcac3fa9
if(internsNameWithCollege.length==0) return res.status(400).send({status:false,msg:"NO INTERN FOUND FROM THIS COLLAGE"})

let NewData={
    name:collegeId.name,
    fullName:collegeId.fullName,
    logoLink:collegeId.logoLink
}

return res.status(200).send({data :NewData,interns:internsNameWithCollege})

}



module.exports={listOfCollageIntern,createCollege}
