import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import myBackgroundImage from '../images/MBTA.jpg'
import { Link } from 'react-router-dom';


const HomePage = () => {
    
    
    const [user, setUser] = useState({})
   
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken')
        return navigate('/')
    }
   
    const handleClickTicket =(c) => {

        c.preventDefault();
        navigate('/buyTicket');
    }
    const handleClickViewing =(c) => {

        c.preventDefault();
        navigate('/ticketViewingPage');
    }

    const handleClickRefunding =(c) => {

        c.preventDefault();
        navigate('/ticketRefundingPage');
    }
    const handleClickeditUser =(c) => {

        c.preventDefault();
        
       
       
        navigate('/UserSecuritypage');
    }

    useEffect(() => {
        setUser(getUserInfo())
    }, [])
    


    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>)
    const { id, email, username, password, favline, favroute } = user
    return (
        <body style={{backgroundImage: `url(${myBackgroundImage})`, backgroundSize: 'cover', height: '100vh'}}>
        <>
            <div id = "myDiv" style ={{TextAlign: "center"}}><center>
                <h3>
                    Welcome To MBTA 
                    <span className='username'> @{username}</span>
                </h3>      
                <h3>
                    
                </h3><h3>
                   
                </h3><h3>
                    
                </h3><h3>
                    
                </h3><h3>
                
                </h3>
            
            <button onClick={(e) => handleClick(e)}>
                Log Out
            </button>
            <Link to ="/buyTicket">
            <button onClick={(e) => handleClickTicket(e)}>
                Buy Ticket
            </button>
            </Link>
            
            
            <Link to ="/ticketRefundingPage">
            <button onClick={(e) => handleClickRefunding(e)}>
                Refund Ticket
            </button>
            </Link>

            <Link to ="/userSecurityPage">
            <button onClick={(e) => handleClickeditUser(e)}>
                Edit My Profile
            </button>
            
            </Link>

            
            
            


            
            <Link to ="/ticketViewingPage">
            <button onClick={(e) => handleClickViewing(e)}>
                View Ticket
            </button>
            </Link>
            
            </center></div>
        </>
        </body>
    )
}
    
export default HomePage