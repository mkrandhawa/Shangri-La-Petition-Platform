import React from "react";
import Header from "../navigation/header";
import LoginForm from "./loginForm";
import Footer from "../navigation/footer";

export default function LoginPage (){

    return(
        <>
            <Header />
            <LoginForm />
            <Footer />
        </>
    )
}