import mongoose from "mongoose"

const JobSchema = new mongoose.Schema({
    company: {
        type: String, 
        required: [true, 'Please provide company'],
        maxlength: 50,
    },
    position: {
        type: String, 
        required: [true, 'Please provide position'],
        maxlength: 100,
    },
    status: {
        type: String, 
        enum: ['technical_interview', 'declined','pending','accepted','coding_assessment', 'phone_interview', 'behavioral_interview',  'rejected/archived', ''],
        default: 'pending',
    },
    jobType: {
        type: String, 
        enum: ['full-time', 'part-time','remote', 'internship', 'hybrid'],
        default: 'full-time',
    },
    jobLocation: {
        type: String, 
        default: 'my city',
        required: true,
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    },     
    jobNotes: {
        type: String, 
        default: '',
        required: false,
    },

    jobHistory:
      [{
        pastStatus: {
            type: String, 
            enum: ['technical_interview', 'declined','pending','accepted','coding_assessment', 'phone_interview', 'behavioral_interview',  'rejected/archived', ''],
            default: '',
            required: false,
        },
        pastNotes: {
            type: String, 
            default: '',
            required: false,
        }}], 

},

{ timestamps: true }

)

export default mongoose.model('Job', JobSchema)