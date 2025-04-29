import { Outlet } from "react-router-dom";
import React from "react";
import Footer from "./components/Header_Footer/Footer";
import Header from "./components/Header_Footer/Header";


export default function Layout(){
    return(
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}