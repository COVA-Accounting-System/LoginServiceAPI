import { User } from "../models/user.model.js"

export const createUser = async (newUser) => {
    return newUser.save()
}

export const getUser = async (query) => {
    return User.findOne(query)
}

export const getUsers = async () => {
    return User.find()
}
