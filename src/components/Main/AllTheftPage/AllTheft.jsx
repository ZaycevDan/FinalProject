import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AllTheft.css'

const AllTheft = () => {


    const [thefts, setThefts] = useState([])
    const [load, setLoad] = useState(false)
    const token = 'Bearer ' + localStorage.getItem('token')


    useEffect(() => {
        getAllTheft()
    }, [])


    async function getAllTheft() {

        setLoad(true)
 
        const options = {
                    headers: {
                        'Authorization': token,
                        'Content-type': 'application/json',
                        }
                    }

        await fetch('https://sf-final-project.herokuapp.com/api/cases/', options)
        .then((response) => {
            const result = response.json();
            return result
        })
        .then((data) => {
            setThefts(...thefts, data.data)
        })

        setLoad(false)
    }

    async function deleteTheft(e) {
        const id = e.target.id

        const url = 'https://sf-final-project.herokuapp.com/api/cases/' + id

        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json',
                _id: id,
                }
            }

        await fetch(url, options)
        .then((response) => {
            const result = response.json();
            return result
        })
        setThefts(thefts.filter(theft => theft._id !== id))
    }


    return (
        <div>
            <h1 className='allTheft_title'>LIST OF THEFTS:</h1>

            {
                load
                ? <h2 style={{fontSize: '20px', textAlign: 'center'}} >Loading.....</h2>
                :  (thefts.length === 0)  
                    ? <h2 style={{fontSize: '20px', textAlign: 'center'}} >We dont have thefts</h2>
                    : thefts.map(theft => {
                        return (
                            <div  id={theft._id} key={theft._id} className='theft_container'>
                                <h2 className='theft_title'>ownerFullName: {theft.ownerFullName}</h2>
                                <p className='theft_licenseNumber'>licenseNumber: {theft.licenseNumber}</p>
                                <Link className='theft_link' to={`/allTheft/${theft._id}`} id={theft._id} >Open</Link>
                                <button id={theft._id} onClick={deleteTheft} className='theft_delete'>Delete</button>
                            </div>
                        )
                    })
            }

        </div>
    );
};

export default AllTheft;