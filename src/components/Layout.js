import React from 'react';
import Navbar from "./common/navbar";

function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <div className="body-container">
                {children}
            </div>
        </div>
    );
}

export default Layout;
