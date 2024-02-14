import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios, { AxiosError } from 'axios'
import { toast } from "react-toastify";

export const UserContext = createContext({})

const UserProvider = ({ children }) => {

    const location = useLocation()

    const [user, setUser] = useState(null)
    const [wallet, setWallet] = useState({})
    const [plans, setPlans] = useState([])
    const [transactions, setTransactions] = useState([])
    const [orders, setOrders] = useState([])

    const impFuncs = () => {
        
        // user detail's
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/me`, { withCredentials: true })
        .then(({ data }) => {
            setUser(data.result)
        })
        .catch((err) => {
            if(err instanceof AxiosError) {
                toast.error(err?.response?.data?.message)
            }
        })

        // wallet information
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/wallet`, { withCredentials: true })
        .then(({ data }) => {
            setWallet(data.result)
        })
        .catch((err) => {
            if(err instanceof AxiosError) {
                toast.error(err?.response?.data?.message)
            }
        })

        // plans
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/plans`, { withCredentials: true })
        .then(({ data }) => {
            setPlans(data.result)
        }).catch((err) => {
            if(err instanceof AxiosError) {
                toast.error(err?.response?.data?.message)
            }
        })

        // orders
        axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/user/orders`, { withCredentials: true })
        .then(({ data }) => {
            setOrders(data.result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        })
        .catch((err) => {
            if (err instanceof AxiosError) {
                console.log(err);
            }
        });

        axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/user/transactions`, { withCredentials: true })
        .then(({ data }) => {
            console.log(data)
            setTransactions(data.result);
        })
        .catch((err) => {
            if (err instanceof AxiosError) {
                console.log(err);
            }
        });
    }

    const refresh = () => impFuncs()

    useEffect(() => {
        impFuncs()
    }, [location]) // refresh on path change

    return (
        <UserContext.Provider value={{ user, wallet, plans, transactions, orders, refresh }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider