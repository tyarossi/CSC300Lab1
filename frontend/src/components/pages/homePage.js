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
        var textColorVar = document.getElementById("color");
        localStorage.setItem("textColor",document.getElementById("color").value)
        localStorage.setItem("bgColor", textColorVar.options[textColorVar.selectedIndex].text)
        document.body.style.background = localStorage.getItem("bgColor")
        document.getElementById("myDiv").style.background = localStorage.getItem("bgColor")
        document.getElementById("myDiv").style.color = localStorage.getItem("textColor")
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
            <div id = "myDiv"><center>
                <h3>
                    Welcome
                    <span className='username'> @{username}</span>
                </h3>      
                <h3>
                    Your favorite line is
                    <span className='favline'> {favline}</span>
                </h3><h3>
                    Your favorite route is
                    <span className='favroute'> {favroute}</span>
                </h3><h3>
                    <label for = "color">Change Background: </label>
                </h3><h3>
                    <select name = "color" id="color">
                        <option value="black">White</option>
                        <option value="black">AntiqueWhite</option>
                        <option value="black">LightPink</option>
                        <option value="black">LightBlue</option>
                        <option value="black">LightGreen</option>
                        <option value ="lightgrey">Black</option>
                    </select>
                </h3><h3>
                <button onClick={(c) => handleClickColor(c)}>
                    Change
                    </button>
                </h3>
            
            <button onClick={(e) => handleClick(e)}>
                Log Out
            </button>
            </center></div>
        </>
        </body>
    )
}
    
export default HomePage