import React from 'react';
import Hero from './Components/Hero/Hero.component';
import Body from './Components/Body/Body.component';
import PreFooter from './Components/PreFooter/PreFooter.component';
import Footer from './Components/Footer/Footer.component';
import './home.style.scss';

const Home=()=> {
    return (
        <div>
                <Hero/>
                <Body/>
                <PreFooter/>
                <Footer/>
        </div>
    )
}

export default Home;