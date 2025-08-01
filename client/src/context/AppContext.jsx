import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext();

export const AppProvider = ({ children })=>{

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY

    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [pickupDate, setPickupDate] = useState('')
    const [returnDate, setReturnDate] = useState('')

    const [cars, setCars] = useState([])

    // Function to check if user is logged in
    const fetchUser = async ()=>{
        try {
           const {data} = await axios.get('/api/user/data')
           if (data.success) {
            setUser(data.user)
            setIsOwner(data.user.role === 'owner')
           }else{
            // If user data fetch fails, clear invalid token
            localStorage.removeItem('token')
            setToken(null)
            setUser(null)
            setIsOwner(false)
            delete axios.defaults.headers.common['Authorization']
           }
        } catch (error) {
            // If request fails (e.g., invalid token), clear auth state
            localStorage.removeItem('token')
            setToken(null)
            setUser(null)
            setIsOwner(false)
            delete axios.defaults.headers.common['Authorization']
            console.error('Auth error:', error.message)
        }
    }
    // Function to fetch all cars from the server

    const fetchCars = async () =>{
        try {
            // Create a separate axios instance without auth headers for public endpoints
            const publicAxios = axios.create({
                baseURL: import.meta.env.VITE_BASE_URL
            });
            const {data} = await publicAxios.get('/api/user/cars')
            data.success ? setCars(data.cars) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to log out the user
    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        delete axios.defaults.headers.common['Authorization']
        navigate('/')
        toast.success('Logged out successfully')
    }


    // useEffect to retrieve the token from localStorage
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
        }
        fetchCars()
    },[])

    // useEffect to fetch user data when token is available
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization'] = `${token}`
            fetchUser()
        } else {
            // Clear authorization header if no token
            delete axios.defaults.headers.common['Authorization']
        }
    },[token])

    const value = {
        navigate, currency, axios, user, setUser,
        token, setToken, isOwner, setIsOwner, fetchUser, showLogin, setShowLogin, logout, fetchCars, cars, setCars, 
        pickupDate, setPickupDate, returnDate, setReturnDate
    }

    return (
    <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}
