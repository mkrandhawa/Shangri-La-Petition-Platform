import React from 'react';
import Header from '../navigation/header';
import Footer from '../navigation/footer';

export default function AccessDenied(){
  return (
    <>
      <Header />
        <main className="homePage">
            <div className="mainName">
                <span className="mainText">Access Denied!</span>
            </div>
            <div className="nameSlogan">
                <span className="slogan">You do not have permission to view this page. Please log in with the appropriate credentials to continue.</span>
            </div>
        </main>
    <Footer />
    </>
  );
};

