import React from 'react';
import { Navbar } from "../../components";
import { Footer } from "../../components";

function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <div className="body-container">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
