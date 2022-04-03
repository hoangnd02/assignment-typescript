import { useDispatch } from 'react-redux'
import { UserType } from '../types/User'
import { login } from "../features/user/userSlice"


export const authenticated = (user: UserType, next: () => void) => {
    localStorage.setItem('user', JSON.stringify(user))
    next()
}

export const isAuthenticate = () => {
    return JSON.parse(localStorage.getItem("user") as string)
}