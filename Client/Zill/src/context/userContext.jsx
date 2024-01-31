import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios, { AxiosError } from 'axios'
import { toast } from "react-toastify";

export const UserContext = createContext({})

const UserProvider = ({ children }) => {

    const location = useLocation()

    const [user, setUser] = useState({})
    const [wallet, setWallet] = useState({})
    const [plans, setPlans] = useState([])

    useEffect(() => {
        // user detail's
        axios.get('http://localhost:3000/api/user/me', { withCredentials: true })
        .then(({ data }) => {
            setUser(data.result)
        })
        .catch((err) => {
            if(err instanceof AxiosError) {
                toast.error(err?.response?.data?.message)
            }
        })

        // wallet information
        axios.get('http://localhost:3000/api/user/wallet', { withCredentials: true })
        .then(({ data }) => {
            setWallet(data.result)
        })
        .catch((err) => {
            if(err instanceof AxiosError) {
                toast.error(err?.response?.data?.message)
            }
        })

        // plans
        axios.get('http://localhost:3000/api/user/plans', { withCredentials: true })
        .then(({ data }) => {
            setPlans(data.result.map((plan) => plan.plan_id))
        }).catch((err) => {
            if(err instanceof AxiosError) {
                toast.error(err?.response?.data?.message)
            }
        })
    }, [location]) // refresh on path change

    return (
        <UserContext.Provider value={{ user, wallet, plans }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider