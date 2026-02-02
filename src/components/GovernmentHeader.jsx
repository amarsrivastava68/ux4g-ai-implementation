import React, { useState, useEffect } from 'react';

const GovernmentHeader = () => {
    const [fontSize, setFontSize] = useState(() => {
        const saved = localStorage.getItem('fontSize');
        return saved ? parseFloat(saved) : 1;
    });
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        document.body.style.fontSize = `${fontSize}rem`;
    }, [fontSize]);

    const decreaseFont = () => {
        setFontSize(prev => {
            const newSize = Math.max(0.8, prev - 0.1);
            localStorage.setItem('fontSize', newSize);
            return newSize;
        });
    };

    const resetFont = () => {
        setFontSize(1);
        localStorage.setItem('fontSize', '1');
    };

    const increaseFont = () => {
        setFontSize(prev => {
            const newSize = Math.min(1.5, prev + 0.1);
            localStorage.setItem('fontSize', newSize);
            return newSize;
        });
    };

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        // Add logic for language change
    };

    return (
        <>
            <style>{`
                .font-control-btn {
                    background: transparent;
                    border: none;
                    color: ${isDarkMode ? '#ffffff' : '#ffffff'};
                    cursor: pointer;
                    padding: 2px 6px;
                    font-size: 12px;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    opacity: 0.7;
                }

                .font-control-btn:hover {
                    opacity: 1;
                    transform: scale(1.05);
                }

                .font-control-btn.active {
                    opacity: 1;
                    font-weight: 600;
                }

                .controls-container {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .font-controls {
                    display: flex;
                    align-items: center;
                    gap: 1px;
                }

                .divider {
                    color: ${isDarkMode ? '#ffffff' : '#cccccc'};
                    margin: 0 3px;
                    font-size: 12px;
                }

                .light_dark_icon {
                    display: flex;
                    align-items: center;
                }

                .light_mode {
                    display: none;
                }

                .checkbox-label {
                    background-color: ${isDarkMode ? '#4a5568' : '#cbd5e0'};
                    border-radius: 50px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 2px;
                    position: relative;
                    height: 16px;
                    width: 32px;
                    transition: background-color 0.2s;
                }

                .checkbox-label .fa-moon,
                .checkbox-label .fa-sun {
                    font-size: 8px;
                    z-index: 1;
                }

                .checkbox-label .fa-moon {
                    color: #f1c40f;
                }

                .checkbox-label .fa-sun {
                    color: #f39c12;
                }

                .checkbox-label .ball {
                    background-color: #fff;
                    border-radius: 50%;
                    position: absolute;
                    top: 1px;
                    left: 1px;
                    height: 14px;
                    width: 14px;
                    transition: transform 0.2s linear;
                }

                .light_mode:checked + .checkbox-label .ball {
                    transform: translateX(16px);
                }

                .language01 {
                    display: flex;
                    align-items: center;
                }

                .language01 form {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .language01 select {
                    background: transparent;
                    border: 1px solid ${isDarkMode ? '#ffffff' : '#ffffff'};
                    color: ${isDarkMode ? '#ffffff' : '#ffffff'};
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-size: 12px;
                    cursor: pointer;
                }

                .language01 select:focus {
                    outline: none;
                    border-color: ${isDarkMode ? '#888888' : '#999999'};
                }

                .language01 i {
                    color: ${isDarkMode ? '#ffffff' : '#000000'};
                    font-size: 12px;
                }
            `}</style>
            
            <header>
                <div className="header-top px-2" style={{ backgroundColor : '#000000' , paddingTop: '5px', paddingBottom: '5px' }}>
                    <div className="row" style={{ marginRight: '40px', marginLeft: "40px" }}>
                        <div className="col-xl-6 col-lg-3 d-flex col-sm-6 col-6 align-items-left">
                            <span className="goi">
                                <a href="https://www.india.gov.in/" target="_blank" className="goi">
                                    <img src="https://doc.ux4g.gov.in/assets/img/icon/in-flag.png" className="img-fluid" alt="indian flag" loading="lazy"  />
                                    <strong style={{ color: '#ffffff' , marginLeft : '8px' }}>भारत सरकार | Government of India</strong>
                                </a>
                            </span>
                        </div>
                        <div className="col-xl-6 col-lg-9 col-sm-6 col-6 text-end">
                            <div className="controls-container" style={{ justifyContent: 'flex-end' }}>

                                <div className="font-controls">

                                    <span style={{color : 'white'}}>skip to content</span>
                                     <span className="divider">|</span>
                                
                                    <button
                                        role="button"
                                        className="font-control-btn"
                                        onClick={decreaseFont}
                                        title="Decrease font size"
                                    >
                                        -A
                                    </button>
                                    <button
                                        role="button"
                                        className="font-control-btn active"
                                        onClick={resetFont}
                                        title="Reset font size"
                                    >
                                        A
                                    </button>
                                    <button
                                        role="button"
                                        className="font-control-btn"
                                        onClick={increaseFont}
                                        title="Increase font size"
                                    >
                                        A+
                                    </button>
                                </div>
                                
                                {/* <span className="divider">|</span>
                                
                                <span className="light_dark_icon">
                                    <input type="checkbox" className="light_mode" id="checkbox" checked={isDarkMode} onChange={toggleTheme} />
                                    <label htmlFor="checkbox" className="checkbox-label">
                                        <i className="fas fa-moon"></i>
                                        <i className="fas fa-sun"></i>
                                        <span className="ball"></span>
                                    </label>
                                </span> */}
                                
                                <span className="divider">|</span>
                                
                                <span className="language01">
                                    <form id="langForm" method="POST">
                                        <i className="fa-solid fa-globe"></i>
                                        <select name="language" id="changeLang" value={language} onChange={handleLanguageChange}>
                                            <option value="" disabled>Language</option>
                                            <option value="en">English</option>
                                        </select>
                                    </form>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="header-sticky" className="header-area  header-white  mt-sm-0"style={{ marginRight: '48px', marginLeft: "20px" }} >
                    <div className="nav_custom d-flex align-items-center ">
                        <div className="logo ">
                            <a href="">
                                <img src="national-emblem.png" alt="ux4g logo" loading="lazy" />
                                <img src="TSRS_Logo.png" alt="ux4g logo" loading="lazy" />
                            </a>
                          
                        </div>
                        <nav className=" flex-grow-1 " role="navigation">
                            <div className="container">
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContentGov" aria-controls="navbarSupportedContentGov" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                
                            </div>
                        </nav>
                        <span className="gap-3 d-flex float-end">
                            <a href="#" className="d-none d-sm-block" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isDarkMode ? '#ffffff' : 'blue' }}>
                                <i className="fas fa-headphones" style={{color: 'gray'}}></i>
                                Help and Support
                            </a>
                            |
                            <a href="#" className="d-none d-sm-block" style={{ color: isDarkMode ? '#ffffff' : 'blue' }}>
                                Login
                            </a>
                        </span>
                    </div>
                </div>
            </header>
        </>
    );
};

export default GovernmentHeader;