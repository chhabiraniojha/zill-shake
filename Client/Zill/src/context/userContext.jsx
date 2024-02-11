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
            setPlans(data.result)
        }).catch((err) => {
            if(err instanceof AxiosError) {
                toast.error(err?.response?.data?.message)
            }
        })

        // orders
        axios
        .get("http://localhost:3000/api/user/orders", { withCredentials: true })
        .then(({ data }) => {
            setOrders(data.result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        })
        .catch((err) => {
            if (err instanceof AxiosError) {
                console.log(err);
            }
        });

        axios
        .get("http://localhost:3000/api/user/transactions", { withCredentials: true })
        .then(({ data }) => {
            setTransactions(data.result);
        })
        .catch((err) => {
            if (err instanceof AxiosError) {
                console.log(err);
            }
        });
    }, [location]) // refresh on path change

    return (
        <UserContext.Provider value={{ user, wallet, plans, transactions, orders }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserProvider