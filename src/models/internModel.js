const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const InternSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim:true,
      lowercase:true,
      uppercase: false
   },
   
   collegeId: {
      type: ObjectId,
      required: true,
      ref:"College"
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim:true
   },
   mobile: {
      type: Number,
      unique: true,
      required: true,
      trim:true,
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
   },
   isDeleted:{
    type:Boolean,
    default:false
   }
   }, { timestemps: true }
)

module.exports = mongoose.model("Intern",InternSchema)