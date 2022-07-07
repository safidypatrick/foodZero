import React from 'react';
import './Hero.style.scss';

const Hero = () => {
    return (
        <div className="hero-page">
            <div className="hero-wrapper">

                {/* Desktop */}
                <div className=" flex hero-desktop">
                    <div className="hero-content">
                    <div className="hero-title">Healthy eating <br/> is important <br/> for lifestyle.</div>

                        <div className="hero-description">
                            <p>
                                Manage makes it simple for software teams<br/>
                                to plan day-to-day tasks while keeping the <br/>
                                larger team goals in view.
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div className="bloc-wrapper">
                            <div className="bloc-image">
                                <img src="images/food3.jpg" alt="image"/> 
                            </div>
                        </div>

                    </div>
                </div>

                {/* Mobile */}
                <div className="hero-mobile">
                    <div className="hero-bloc">
                        <div className="bloc-wrapper">
                            <div className="bloc-image">
                                <img src="images/food2.jpg"/>
                            </div>
                        </div>

                    </div>
                    <div className="hero-content">
                        <div className="hero-title">Healthy eating <br/> is important <br/> for lifestyle.</div>

                        <div className="hero-description">
                            <p>
                                Manage makes it simple for software teams<br/>
                                to plan day-to-day tasks while keeping the <br/>
                                larger team goals in view.
                            </p>
                        </div>

                        <div className="click-button">
                            <div className="button-design">
                                <div className="button-content">Get started</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
