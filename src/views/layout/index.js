import React from 'react';
import { Navbar } from "../../components";
import { Footer } from "../../components";

function Layout({ children, forAdminPanel = false, noNavbar = false, noFooter=false }) {
    return (
        <>
            {noNavbar ?
                null :
                <Navbar forAdminPanel={forAdminPanel} />
            }
            <main className="body-container">
                {children}
            </main>
            {noFooter ?
                null :
                <Footer />
            }
        </>
    );
}

export default Layout;
