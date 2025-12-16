// src/components/BannerCarousel.jsx
import React, { useState, useEffect } from 'react';

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dados de exemplo para os slides
  const slides = [
    {
      id: 1,
      imageUrl: "../public/images/banner/img-banner-crianca.png",
      title: "ARCHITEUR 4.5",
      subtitle: "Produtos de Qualidade",
      bgColor: "bg-amber-500",
      textColor: "text-white"
    },
    {
      id: 2,
      imageUrl: "../public/images/banner/img-banner-crianca.png",
      title: "RÉPONTOIRE",
      subtitle: "Soluções Inovadoras",
      bgColor: "bg-blue-600",
      textColor: "text-white"
    },
    {
      id: 3,
      imageUrl: "../public/images/banner/img-banner-natal.png",
      title: "CHERIENNAUAGE",
      subtitle: "Experiência Premium",
      bgColor: "bg-emerald-600",
      textColor: "text-white"
    },
    {
      id: 4,
      imageUrl: "../public/images/banner/img-banner-crianca.png",
      title: "BEFORTSIE",
      subtitle: "Conforto e Estilo",
      bgColor: "bg-rose-600",
      textColor: "text-white"
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full h-96 relative">
            {/* Imagem de fundo */}
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-fill absolute inset-0"
              loading="lazy"
            />
            {/* Overlay para melhor legibilidade do texto */}
            <div className="absolute inset-0 bg-black/30"></div>

          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;