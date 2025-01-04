import React from 'react';
import Header from '../navigation/header';
import Footer from '../navigation/footer';

export default function PageNotFound(){
  return (
    <>
      <Header />
        <main className="homePage">
          <div className="mainName">
              <span className="mainText">404 :(</span>
          </div>

          <div className="nameSlogan">
              <span className="slogan">Page Not Found</span>
          </div>

        </main>
    <Footer />
    </>
  );
};

