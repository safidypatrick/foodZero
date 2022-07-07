import React from 'react'
import './Body.style.scss'

const Body = () => {
    return (
        <div className="body-page">
            <div className="body-wrapper">

                <div className="body-content">
                    <div className="body-title">View your new menu!</div>
                    <div className="body-description">
                        <p>
                            
                        Et olim licet otiosae sint tribus pacataeque centuriae et<br/>
                         nulla suffragiorum certamina set Pompiliani redierin<br/>
                         per omnes tamen quotquot sunt partes terrarum<br/>
                        </p>
                    </div>
                        <img src="images/food 1.jpg"/>
                </div>

                <div className="body-services">
                    <div className="services-wrapper">
                        <div className="services-card">
                            <div className="services-title">
                                <div className="services-rank">1</div>
                                <div className="main-title">Premium Quality</div>
                            </div>
                            <div className="services-description">
                                <p>
                                   lorem Upsum See how your day-to-day tasks fit into the wider vision. <br/>
                                    Go from tracking progess at the milestone level all the <br/>
                                    way done to the smallest of details. Never lose sight of <br/> the bigger picture again.
                                </p>
                            </div>
                        </div>

                        <div className="services-card">
                            <div className="services-title">
                                <div className="services-rank">2</div>
                                <div className="main-title">Seasonal vegetable</div>
                            </div>
                            <div className="services-description">
                                <p>
                                    Set internal delivery estimates and track progress toward <br/>
                                    company goals. Our customisable dashboard helsp you <br/>
                                    build oout the reports you nedd to keep key stakeholders <br/> informed.
                                </p>
                            </div>
                        </div>

                        <div className="services-card">
                            <div className="services-title">
                                <div className="services-rank">3</div>
                                <div className="main-title">Fresh   fruits</div>
                            </div>
                            <div className="services-description">
                                <p>
                                    Stop jumping from one service to another to <br/>
                                    communicate, store files, track tasks and share <br/>
                                    documents. Manage offers an all-in-one team <br/> productivity solution.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body
