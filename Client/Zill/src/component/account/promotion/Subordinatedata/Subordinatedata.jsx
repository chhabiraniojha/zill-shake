import { useState } from 'react'
import { Link } from "react-router-dom";

import './style.css'


function Subordinatedata() {

    return (
        <>
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
                        <tr>
                            <th scope="row">1</th>
                            <td>+91 9876543210</td>
                            <td>$250</td>
                            <td>$10</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>+91 9876543210</td>
                            <td>$250</td>
                            <td>$10</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>+91 9876543210</td>
                            <td>$250</td>
                            <td>$10</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Subordinatedata