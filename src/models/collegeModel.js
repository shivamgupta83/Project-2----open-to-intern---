const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({
    name: {                                     
        type: String,
        unique: true,
        required: 'College name is Neccasary',
        trim: true,
        lowercase:true
    },
    fullName: {                              
        type: String,
        require: 'Fullname is Neccasary',
        trim: true,
        lowercase:true
    },
    logoLink: {
        type: String,
        required: 'Logolink is Neccasary',
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('College', collegeSchema)