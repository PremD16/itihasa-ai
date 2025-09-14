import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1743451421396-3bf59f101d54?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxLb25hcmslMjBTdW4lMjBUZW1wbGUlMjBjaGFyaW90JTIwd2hlZWx8ZW58MHx8fHwxNzU3ODc5NjYwfDA&ixlib=rb-4.1.0&q=85",
    caption: "Time etched in stone—Cosmic cycles carved by ancient hands.",
    title: "Konark Sun Temple Wheel"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1657302155425-611b7aba5b33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxhbmNpZW50JTIwbWFudXNjcmlwdCUyMFNhbnNrcml0fGVufDB8fHx8MTc1Nzg3OTY3M3ww&ixlib=rb-4.1.0&q=85",
    caption: "Whispers of wisdom—Preserved through centuries of devotion.",
    title: "Palm-Leaf Manuscript"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1711822477552-cab5b397f61b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwSW5kaWFuJTIwd29tYW4lMjBwaGlsb3NvcGhlcnxlbnwwfHx8fDE3NTc4Nzk2Nzl8MA&ixlib=rb-4.1.0&q=85",
    caption: "The voice of Vedic women—fearless, brilliant, eternal.",
    title: "Gargi Debating in Janaka's Court"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/32325834/pexels-photo-32325834.jpeg",
    caption: "Carved from a single rock—an offering to divine architecture.",
    title: "Kailasa Temple at Ellora"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1644051833659-25a1f5f241c4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBtYW5kYWxhJTIwT20lMjBzeW1ib2x8ZW58MHx8fHwxNzU3ODc5NjkyfDA&ixlib=rb-4.1.0&q=85",
    caption: "Om is this whole universe—Mandukya's seed of realization.",
    title: "Mandukya Upanishad Verse Overlay"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1619879310659-01e83a8e9d6b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxzYWNyZWQlMjB5YW50cmElMjBnZW9tZXRyaWN8ZW58MHx8fHwxNzU3ODc5Njk5fDA&ixlib=rb-4.1.0&q=85",
    caption: "Symbols of power—visual mantras that awaken memory.",
    title: "Yantra & Glyph Collage"
  }
];

const SacredSlideshow = ({ isTopSection = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <section className={`${isTopSection ? 'visual-invocation' : 'py-16 px-4'} relative overflow-hidden`}>
      <div className="max-w-full mx-auto">
        {/* Section Header - Only show if not top section */}
        {!isTopSection && (
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold heading-text font-serif mb-4">
              Visual Pilgrimage
            </h3>
            <p className="accent-text text-lg max-w-2xl mx-auto font-body">
              Journey through sacred relics and timeless wisdom carved in stone, script, and spirit
            </p>
          </div>
        )}

        {/* Slideshow Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-charcoal-indigo/90 via-deep-charcoal/80 to-charcoal-indigo/90 sacred-glow">
          {/* Main Slide Display */}
          <div className={`relative ${isTopSection ? 'h-[70vh] md:h-[80vh]' : 'h-96 md:h-[500px]'} overflow-hidden`}>
            <div 
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div 
                  key={slide.id} 
                  className="min-w-full h-full relative"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover slide-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <div className="max-w-4xl mx-auto">
                        <h4 className="text-3xl md:text-4xl font-bold high-contrast-text font-serif mb-4">
                          {slide.title}
                        </h4>
                        <p className="text-xl md:text-2xl high-contrast-text font-body italic leading-relaxed max-w-3xl mb-6">
                          {slide.caption}
                        </p>
                        {isTopSection && (
                          <Button
                            className="learn-more-btn px-6 py-2 rounded-full font-medium"
                            size="lg"
                          >
                            <BookOpen className="mr-2 h-5 w-5" />
                            Learn More
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-4 flex items-center z-10">
            <Button
              variant="ghost"
              size="lg"
              onClick={prevSlide}
              className="bg-black/40 hover:bg-black/60 text-saffron-gold hover:text-ivory-sand backdrop-blur-sm border border-copper-bronze/30"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          </div>
          
          <div className="absolute inset-y-0 right-4 flex items-center z-10">
            <Button
              variant="ghost"
              size="lg"
              onClick={nextSlide}
              className="bg-black/40 hover:bg-black/60 text-saffron-gold hover:text-ivory-sand backdrop-blur-sm border border-copper-bronze/30"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          {/* Auto-play Control */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAutoPlay}
              className="bg-black/40 hover:bg-black/60 text-saffron-gold hover:text-ivory-sand backdrop-blur-sm border border-copper-bronze/30"
            >
              {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-saffron-gold scale-125 shadow-lg"
                    : "bg-copper-bronze/50 hover:bg-copper-bronze"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SacredSlideshow;