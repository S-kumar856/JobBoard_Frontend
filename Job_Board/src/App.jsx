import React from "react";
import { Routes, Route } from 'react-router-dom';
import Register from "./components/pages/register";
import Login from "./components/pages/login";
import Home from "./components/pages/home";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </>
    )
}

export default App;