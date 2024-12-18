import React from "react";
import { Routes, Route } from 'react-router-dom';
import Register from "./components/register/register";
import Login from "./components/login/login";
import Home from "./components/home/home";
import NewJobs from "./components/pages/newJobs";
import UpdateJob from "./components/pages/UpdateJob";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/newjob" element={<NewJobs/>}/>
                {/* <Route path="/editjob/:id" element={<NewJobs/>}/> */}
                <Route path="/updatejob/:id" element={<UpdateJob/>} />
            </Routes>
        </>
    )
}

export default App;