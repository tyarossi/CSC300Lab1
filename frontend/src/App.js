import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
//import trainTrackerPage from "./components/pages/trainTrackerPage";
import MbtaAlertsPage from "./components/pages/mbtaAlerts";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import BuyTickets from "./components/pages/buyTicket";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import EditUserProfile from "./components/pages/editUserPage";
import Ticketing from "./components/pages/ticketViewingPage";
import TrainSchedule from "./components/pages/incomingTrainsPage";
//import incomingTrains from "./components/pages/incomingTrains";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";
import Refunding from "./components/pages/ticketRefundingPage";
import Security from  "./components/pages/userSecurityPage";

export const UserContext = createContext();
//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/mbtaAlerts" element={<MbtaAlertsPage />} />
          <Route exact path="/buyTicket" element={<BuyTickets />} />
          <Route exact path="/trainTrackerPage" element={<trainTrackerPage />} />
          <Route exact path="/ticketViewingPage" element={< Ticketing/>} />
          <Route exact path="/ticketRefundingPage" element={< Refunding/>} />
          <Route exact path="/userSecuritypage" element={< Security/>} />


          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route path="/editUserProfile" element={<EditUserProfile />} />
          <Route path="/incomingTrainsPage" element={<TrainSchedule />} />
          //<Route path="/incomingTrains" element={<incomingTrains />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
