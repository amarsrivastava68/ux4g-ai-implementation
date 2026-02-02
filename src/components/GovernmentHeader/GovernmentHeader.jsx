import React, { useState, useEffect } from 'react';
import './GovernmentHeader.css';

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
        <header>
            <div className="header-top px-2">
                <div className="row" style={{ marginRight: '40px', marginLeft: "40px" }}>
                    <div className="col-xl-6 col-lg-3 d-flex col-sm-6 col-6 align-items-left">
                        <span className="goi">
                            <a href="https://www.india.gov.in/" target="_blank" rel="noreferrer">
                                <img src="https://doc.ux4g.gov.in/assets/img/icon/in-flag.png" className="img-fluid" alt="indian flag" loading="lazy" />
                                <strong>भारत सरकार | Government of India</strong>
                            </a>
                        </span>
                    </div>
                    <div className="col-xl-6 col-lg-9 col-sm-6 col-6 text-end">
                        <div className="controls-container" style={{ justifyContent: 'flex-end' }}>
                            <div className="font-controls">
                                <span style={{ color: 'white' }}>skip to content</span>
                                <span className={`divider ${isDarkMode ? 'dark' : 'light'}`}>|</span>
                                
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
                            
                            <span className={`divider ${isDarkMode ? 'dark' : 'light'}`}>|</span>
                            
                            <span className="language01">
                                <form id="langForm" method="POST">
                                    <i className={`fa-solid fa-globe ${isDarkMode ? 'dark' : 'light'}`}></i>
                                    <select 
                                        name="language" 
                                        id="changeLang" 
                                        value={language} 
                                        onChange={handleLanguageChange}
                                        className={isDarkMode ? 'dark' : 'light'}
                                    >
                                        <option value="" disabled>Language</option>
                                        <option value="en">English</option>
                                    </select>
                                </form>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="header-sticky" className="header-area header-white mt-2" style={{ marginRight: '58px', marginLeft: "30px" }}>
                <div className="nav_custom d-flex align-items-center">
                    <div className="logo d-flex align-items-center" style={{ gap: '10px' }}>
                        <a href="/" className="d-flex align-items-center" style={{ gap: '10px' }}>
                            <img src="national-emblem.png" alt="national emblem" loading="lazy" style={{ height: '60px' }} />
                            <span style={{ color: '#ccc', fontSize: '40px', lineHeight: '60px' }}>|</span>
                            <img src="TSRS Logo.svg" alt="TSRS logo" loading="lazy" style={{ height: '60px' }} />
                        </a>
                    </div>
                    <nav className="flex-grow-1" role="navigation">
                        <div className="container">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContentGov" aria-controls="navbarSupportedContentGov" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </nav>
                    <span className="gap-3 d-flex align-items-center">
                        <a href="#" className="d-none d-sm-block" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isDarkMode ? '#ffffff' : 'blue' }}>
                            <i className="fas fa-headphones" style={{ color: 'gray' }}></i>
                            Help and Support
                        </a>
                        <span style={{ color: '#ccc' }}>|</span>
                        <a href="#" className="d-none d-sm-block" style={{ color: isDarkMode ? '#ffffff' : 'blue' }}>
                            Login
                        </a>
                    </span>
                </div>
            </div>
        </header>
    );
};

export default GovernmentHeader;