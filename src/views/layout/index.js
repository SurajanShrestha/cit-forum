import React from 'react';
import { Navbar } from "../../components";
import { Footer } from "../../components";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="body-container">
                {children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;
