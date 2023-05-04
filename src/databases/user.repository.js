import { User } from '../models/user.model.js'

export const createUser = async newUser => {
  return newUser.save()
}

export const getUser = async query => {
  return User.findOne(query)
}

export const getUsers = async () => {
  return User.find()
}

export const editUser = async (id, newUser) => {
  const updatedUser = await User.findOneAndUpdate({ _id: id }, newUser, {
    new: true
  }) // Add { new: true } to return the updated document
  return updatedUser
}

export const deleteUser = async id => {
  return User.findOneAndDelete({ _id: id })
}

export const findUserByIdAndUpdate = async (id, update) => {
  return User.findByIdAndUpdate(id, update)
}

export const findUserAndCheckRecoverTokenValidity = async (email, token) => {
  return User.findOne(email)
    .where('passwordResetToken')
    .equals(token)
    .where('passwordResetExpires')
    .gt(Date.now())
}
