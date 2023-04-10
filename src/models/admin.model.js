import mongoose from "mongoose"
import bcrytp from "bcrypt"

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true
});

adminSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrytp.genSalt(10);
    return bcrytp.hash(password, salt);
}

adminSchema.statics.verifyPassword = async (recievedPassword, password ) => {
    return bcrytp.compare(recievedPassword, password )
}

export const Admin = mongoose.model("Admin", adminSchema);