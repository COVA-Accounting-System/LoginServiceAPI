import { Admin } from "../models/admin.model.js";

export const createAdmin = async (newAdmin) => {
    return newAdmin.save()
}

export const getAdmin = async (query) => {
    return Admin.findOne(query)
}