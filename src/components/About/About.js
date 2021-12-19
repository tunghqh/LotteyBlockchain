import './About.css'
import {FaHome,FaArrowRight} from 'react-icons/fa'
import imgabout from '../assets/img/about/about.png'
import aboutvdbg from '../assets/img/about/about-video-bg.jpg'
import videoicon from '../assets/img/about/play-icon-red.png'
import icon1 from '../assets/img/about/icon1.png'
import icon2 from '../assets/img/about/payout.png'
import icon3 from '../assets/img/about/icon2.png'
import icon4 from "../assets/img/about/security.png"
import icon5 from "../assets/img/about/reward.png"
import icon6 from "../assets/img/about/icon3.png"
import com from "../assets/img/about/community-icon.png"
import blog from "../assets/img/about/blog-icon.png"



function About(){

    return (
        <div className="minigame">
            <div className="hero">
            <div className="bc-lottery">
            <img src={imgabout} alt="" className="ltr__img" />
            <div className="grid">
                <div className="grid__row">
                    <div className="col-12">
                        <h4 className="title">ABOUT</h4>
                        <ul className="lead__list">
                            <li className="lead__item">
                                <FaHome />
                                Home
                            </li>
                            <li className="lead__item">
                                <FaArrowRight />
                            </li>
                            <li className="lead__item">
                                About
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className="about__us">
            <div className="about__container">
                <div className="grid__row">
                    <div className="col-6">
                        <div className="about__video">
                            <img className="about__video-img" src={aboutvdbg} alt="" />
                            <a href="#" className="play__video">
                                <img src={videoicon}alt=""/>
                            </a>
                        </div>
                        
                    </div>
                    <div className="col-6">
                        <div className="section-heading">
                            <h5 className="subtitle">OUR JOURNEY IN A NUTSHELL</h5>
                            <h2 className="title">ABOUT ETM JACKPOT</h2>
                            <p className="text">ETM Jackpot is a unique cryptogames providing pleasant pastime. 
                                We offer our members to play Provably Fair games and some bonus games,
                                 join contests, achieve various awards.</p>
                            <p className="text">ETM Jackpot is a unique cryptogames providing pleasant pastime. 
                                We offer our members to play Provably Fair games and some bonus games,
                                 join contests, achieve various awards.</p>
                            <div className="btn-pink btn btn__read">
                                <p className="btn__title">READ MORE</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="features">
            <div className="fea__container">
                <div className="grid__row center">
                    <div className="col-8">
                        <div className="section-heading">
                            <div className="subtitle">AN EXHAUSTIVE LIST OF</div>
                            <div className="title">AMAZING FEATURES</div>
                            <p className="text">t’s up to the competition in features, with some unique advantages.All the latest crypto games.Here are some of them.</p>
                        </div>
                    </div>
                    <div className="grid__row">
                        <div className="col-12">
                            <div className="features__box">
                                <div className="features__box-inner">
                                    <div className="grid__row">
                                        <div className="col-6">
                                            <div className="single-feature">
                                                <div className="single-feature-icon amazing">
                                                    <img src={icon1} alt="" className="feature-icon-img" />
                                                </div>
                                                <div className="feature-text">
                                                    <div className="feature-content">EXCLUSIVE BONUSES</div>
                                                    <p className="feature-read">READ MORE <FaArrowRight /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="single-feature">
                                                <div className="single-feature-icon amazing">
                                                    <img src={icon2} alt="" className="feature-icon-img" />
                                                </div>
                                                <div className="feature-text">
                                                    <div className="feature-content">INSTANT PAYOUT</div>
                                                    <p className="feature-read">READ MORE <FaArrowRight /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="single-feature">
                                                <div className="single-feature-icon amazing">
                                                    <img src={icon3} alt="" className="feature-icon-img" />
                                                </div>
                                                <div className="feature-text">
                                                    <div className="feature-content">PROVABLY FAIR</div>
                                                    <p className="feature-read">READ MORE <FaArrowRight /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="single-feature">
                                                <div className="single-feature-icon amazing">
                                                    <img src={icon4} alt="" className="feature-icon-img" />
                                                </div>
                                                <div className="feature-text">
                                                    <div className="feature-content">SECURE PLAYING</div>
                                                    <p className="feature-read">READ MORE <FaArrowRight /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="single-feature">
                                                <div className="single-feature-icon amazing">
                                                    <img src={icon5} alt="" className="feature-icon-img"/>
                                                </div>
                                                <div className="feature-text">
                                                    <div className="feature-content">REWARSD</div>
                                                    <p className="feature-read">READ MORE <FaArrowRight /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="single-feature">
                                                <div className="single-feature-icon amazing">
                                                    <img src={icon6} alt="" className="feature-icon-img" />
                                                </div>
                                                <div className="feature-text">
                                                    <div className="feature-content">24/7 SUPPORT</div>
                                                    <p className="feature-read">READ MORE <FaArrowRight /></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="community-blog">
            <div className="cmm_container">
                <div className="grid__row">
                    <div className="col-6">
                        <div className="cmm-box">
                            <div className="img">
                                <img src={com} alt="" />
                            </div>
                            <div className="cmm__content">
                                <div className="title">
                                    COMMUNITY
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                                <div className="text">Find answers, support, and inspiration from other Jeugo users.</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="cmm-box">
                            <div className="img">
                                <img src={blog} alt="" />
                            </div>
                            <div className="cmm__content">
                                <div className="title">
                                    BLOGS
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                                <div className="text">Find answers, support, and inspiration from other Jeugo users.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default About