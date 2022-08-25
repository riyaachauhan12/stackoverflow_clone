import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    DateOfBirth:{type: String, required: true},
    // age:{type:String, default: DateOfBirth.now},
    about: {type: String },
    tags: {type: [String] },
    joinedOn: {type: Date, default: Date.now }
})

export default mongoose.model("User", userSchema)