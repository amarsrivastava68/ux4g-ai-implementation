import './HeroCarousel.css';

function HeroCarousel() {
  const slides = [
    {
      image: '/Carousel_Image.jpg',
      title: 'National Textile Unit Registration',
      subtitle: '& Statistical Reporting',
      description: 'Register your textile unit and submit annual and monthly returns digitally through India\'s unified textile data platform'
    }
   
  ];

  return (
    <div id="carouselExampleControlsNoTouching"  className="carousel slide hero-carousel" data-bs-touch="false">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img src={slide.image} className="d-block w-100" alt={slide.title} />
            
            <div className="carousel-overlay">
              <div className="carousel-content">
                <h1>{slide.title}</h1>
                <h2>{slide.subtitle}</h2>
                <p>{slide.description}</p>
                
                <div className="carousel-buttons">
                  <button className="btn btn-primary">New Registration - Manual Entry</button>
                  <button className="btn btn-light">Register via Entity Locker</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default HeroCarousel;
