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
    <header>
            <div className="header-top px-2">
                    <div className="row">
                            <div className="col-xl-6   col-lg-3 d-flex col-sm-6 col-6  align-items-left">
                                    <span className="goi">
                                            <a href="https://www.india.gov.in/" target="_blank" className="goi">
                                                    <img src="https://doc.ux4g.gov.in/assets/img/icon/in-flag.png" className="img-fluid" alt="indian flag" loading="lazy" style={{ marginRight: '4px' }} />
                                                    <strong style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Government of India</strong>
                                            </a>
                                    </span>
                            </div>
                            <div className="col-xl-6 col-lg-9 col-sm-6 col-6 text-end">
                                    <span className="d-none d-md-inline">
                                            <button role="button" id="btn-decrease" className="font01" onClick={decreaseFont}>
                                                    -A
                                            </button>
                                            <button role="button" id="btn-orig" className="font01 active01" onClick={resetFont}>
                                                    A
                                            </button>
                                            <button role="button" id="btn-increase" className="font01" onClick={increaseFont}>
                                                    A+
                                            </button>
                                            <span className="partition">|</span>
                                    </span>
                                    <span className="light_dark_icon">
                                            <input type="checkbox" className="light_mode" id="checkbox" checked={isDarkMode} onChange={toggleTheme} />
                                            <label htmlFor="checkbox" className="checkbox-label">
                                                    <i className="fas fa-moon"></i>
                                                    <i className="fas fa-sun"></i>
                                                    <span className="ball"></span>
                                            </label>
                                    </span>
                                    <span className="language01">
                                            <form id="langForm" method="POST">
                                                    <i className="fal fa-globe"></i>
                                                    <select name="language" id="changeLang" value={language} onChange={handleLanguageChange}>
                                                            <option value="" disabled>Language</option>
                                                            <option value="en">English</option>
                                                    </select>
                                            </form>
                                    </span>
                            </div>
                    </div>
            </div>
            <div id="header-sticky" className="header-area shadow-sm header-white px-2 pt-2 pb-2 mt-sm-0">
                    <div className="nav_custom d-flex align-items-center pl-15 pr-15">
                            <div className="logo">
                                    <a href="">
                                            <img src="https://doc.ux4g.gov.in/assets/img/logo/national-emblem.png" alt="ux4g logo" loading="lazy" />
                                            <img src="https://doc.ux4g.gov.in/assets/img/logo/company-logo.png" alt="ux4g logo" loading="lazy" />
                                    </a>
                                    <a href="https://www.g20.in/en/" target="_blank">
                                            <img className="g20_logo" src="https://doc.ux4g.gov.in/assets/img/logo/g20-summit.png" alt="g20" loading="lazy" style={{ marginLeft: '10px', marginRight: '30px' }} />
                                    </a>
                            </div>
                            <nav className="navbar flex-grow-1 navbar-expand-lg" role="navigation">
                                    <div className="container-fluid">
                                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContentGov" aria-controls="navbarSupportedContentGov" aria-expanded="false" aria-label="Toggle navigation">
                                                    <span className="navbar-toggler-icon"></span>
                                            </button>
                                            <div className="collapse navbar-collapse" id="navbarSupportedContentGov">
                                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                                            <li className="nav-item dropdown">
                                                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            item1
                                                                    </a>
                                                                    <ul className="dropdown-menu">
                                                                            <li><a className="dropdown-item" href="#">item1</a></li>
                                                                            <li><a className="dropdown-item" href="#">item2</a></li>
                                                                    </ul>
                                                            </li>
                                                            <li className="nav-item dropdown">
                                                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            item2
                                                                    </a>
                                                                    <ul className="dropdown-menu">
                                                                            <li><a className="dropdown-item" href="#">item1</a></li>
                                                                            <li><a className="dropdown-item" href="#">item2</a></li>
                                                                    </ul>
                                                            </li>
                                                            <li className="nav-item dropdown">
                                                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            item3
                                                                    </a>
                                                                    <ul className="dropdown-menu">
                                                                            <li><a className="dropdown-item" href="#">item1</a></li>
                                                                            <li><a className="dropdown-item" href="#">item2</a></li>
                                                                    </ul>
                                                            </li>
                                                            <li className="nav-item dropdown">
                                                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            item4
                                                                    </a>
                                                                    <ul className="dropdown-menu">
                                                                            <li><a className="dropdown-item" href="#">item1</a></li>
                                                                            <li><a className="dropdown-item" href="#">item2</a></li>
                                                                    </ul>
                                                            </li>
                                                    </ul>
                                            </div>
                                    </div>
                            </nav>
                            <span className="gap-3 d-flex float-end">
                                    <a href="#" className="d-none d-sm-block" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isDarkMode ? '#ffffff' : '#0000ff' }}>
                                            <i className="fas fa-headphones"></i>
                                            Help and Support
                                    </a>
                                    |
                                    <a href="#" className="d-none d-sm-block" style={{ color: isDarkMode ? '#ffffff' : '#0000ff' }}>
                                            Login
                                    </a>
                            </span>
                    </div>
            </div>
    </header>
);
};

export default GovernmentHeader;