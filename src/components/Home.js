import React from 'react';
import Navbar from "./common/navbar";
import HeaderBar from "./common/HeaderBar";
import List from './common/List';

function Home() {
    return (
        <div>
            <Navbar />
            <div className="body-container">
                <HeaderBar />
                <List />
            </div>
        </div>
    );
}

export default Home;
