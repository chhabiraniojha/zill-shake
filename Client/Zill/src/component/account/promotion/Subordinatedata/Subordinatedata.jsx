import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import './style.css'
import axios from 'axios';


function Subordinatedata() {

    const [subordinates, setSubordinates] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/user/subordinates', { withCredentials: true })
        .then(({ data }) => {
            setSubordinates(data.result)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/promotion"><i className="fa fa-angle-double-left"></i> Promotion</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Subordinate Data</li>
                </ol>
            </nav>
            <div className="Subordinatedata">
                <table className="table table-success table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Total earing</th>
                            <th scope="col">Your commission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subordinates.map((item, i) => (
                                <tr>
                                <th scope="row">{i}</th>
                                <td>{item.phone}</td>
                                <td>${item.total_rewards}</td>
                                <td>${item.commission}</td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Subordinatedata