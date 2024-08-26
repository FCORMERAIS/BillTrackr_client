import React, { useRef, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../css/caroussel.css"

const FeatureCarousel = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        sliderRef.current.slickNext();
      } else {
        sliderRef.current.slickPrev();
      }
    };

    const currentSlider = sliderRef.current?.innerSlider?.list?.parentElement;
    if (currentSlider) {
      currentSlider.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (currentSlider) {
        currentSlider.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <Slider ref={sliderRef} {...settings}>
      <div >
        <div
          style={{
            backgroundImage: "url('carousel1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "30em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <div>
            <h3>Analyse des gains et des dépenses</h3>
            <p>Bientôt disponible, une analyse détaillée de vos gains et dépenses pour une gestion financière optimisée.</p>
          </div>
        </div>
      </div>

      <div className='carousselElement'>
        <div
          style={{
            backgroundImage: "url('carousel2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "30em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <div>
            <h3>Envoi automatique de mails de rappel</h3>
            <p>Un outil automatique pour rappeler les clients qui n'ont pas réglé leurs factures à temps.</p>
          </div>
        </div>
      </div>

      <div className='carousselElement'>
        <div
          style={{
            backgroundImage: "url('carousel3.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "30em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <div>
            <h3>À propos de moi</h3>
            <p>Je m'appelle Cormerais Flavio , créateur de cette application, dédié à vous aider à mieux gérer vos finances.</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default FeatureCarousel;
