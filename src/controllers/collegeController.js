const createCollege = async function(req,res){
    try{
    
        const{name,fullName,logoLink} = req.body
        let savedcollege = await collegeModel.create({name,fullName,logoLink})
        return res.status(201).send({status : true,data : savedcollege})
    }
    catch(err){
        res.status(500).send({status :false,message : err.message })
    }
    }