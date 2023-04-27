import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
const HomePage = () => {
    
    
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken')
        return navigate('/')
    }
    const handleClickColor = (c) => {
        c.preventDefault();
        localStorage.setItem("bgColor",document.getElementById("color").value)
        document.body.style.background = localStorage.getItem("bgColor")
        document.getElementById("myDiv").style.background = localStorage.getItem("bgColor")
    }

    useEffect(() => {
        setUser(getUserInfo())
    }, [])
    


    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>)
    const { id, email, username, password, favline, favroute } = user
    return (
        <body>
        <>
            <div id = "myDiv">
                <h3>
                    Welcome
                    <span className='username'> @{username}</span>
                </h3>
                <h3>
                    Your userId in mongo db is
                    <span className='userId'> {id}</span>
                </h3>
                <h3>
                    Your registered email is
                    <span className='email'> {email}</span>
                </h3>
                <h3>
                    Your password is
                    <span className='password'> {password} ( hashed )</span>
                </h3>
                <h3>
                    Your favorite line is
                    <span className='favline'> {favline}</span>
                </h3><h3>
                    Your favorite route is
                    <span className='favroute'> {favroute}</span>
                </h3><h3>
                    <label for = "color">Change Background: </label>
                    <select name = "color" id="color">
                        <option value="white">White</option>
                        <option value="red">Red</option>
                        <option value="yellow">Yellow</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value ="black">Black</option>
                    </select>
                <button onClick={(c) => handleClickColor(c)}>
                    Change
                    </button>
                </h3>
            
            <button onClick={(e) => handleClick(e)}>
                Log Out
            </button>
            </div>
        </>
        </body>
    )
}
    
export default HomePage