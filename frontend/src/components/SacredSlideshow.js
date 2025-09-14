import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

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

const SacredSlideshow = () => {
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
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-amber-100 font-serif mb-4">
            Visual Pilgrimage
          </h3>
          <p className="text-amber-200/70 text-lg max-w-2xl mx-auto">
            Journey through sacred relics and timeless wisdom carved in stone, script, and spirit
          </p>
        </div>

        {/* Slideshow Container */}
        <Card className="sacred-glow bg-gradient-to-br from-amber-900/20 via-purple-900/30 to-indigo-900/40 backdrop-blur-sm border-copper-bronze/30 overflow-hidden">
          <CardContent className="p-0 relative">
            {/* Main Slide Display */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
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
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h4 className="text-2xl md:text-3xl font-bold text-amber-100 font-serif mb-2">
                          {slide.title}
                        </h4>
                        <p className="text-lg md:text-xl text-amber-200 font-body italic leading-relaxed max-w-3xl">
                          {slide.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-4 flex items-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={prevSlide}
                className="bg-black/30 hover:bg-black/50 text-amber-300 hover:text-amber-100 backdrop-blur-sm"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            </div>
            
            <div className="absolute inset-y-0 right-4 flex items-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={nextSlide}
                className="bg-black/30 hover:bg-black/50 text-amber-300 hover:text-amber-100 backdrop-blur-sm"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

            {/* Auto-play Control */}
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAutoPlay}
                className="bg-black/30 hover:bg-black/50 text-amber-300 hover:text-amber-100 backdrop-blur-sm"
              >
                {isAutoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-amber-400 scale-125"
                      : "bg-amber-600/50 hover:bg-amber-500"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SacredSlideshow;