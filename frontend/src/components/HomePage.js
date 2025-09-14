import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Copy, Download, Volume2, VolumeX, Scroll, Sparkles, Crown, Building, Play, Pause } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { mockData } from "../data/mock";
import SacredSlideshow from "./SacredSlideshow";

const HomePage = () => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [selectedOutputType, setSelectedOutputType] = useState("");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mantraAudioPlaying, setMantraAudioPlaying] = useState(false);
  const [availableSubtopics, setAvailableSubtopics] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedTheme) {
      const theme = mockData.themes.find(t => t.id === selectedTheme);
      setAvailableSubtopics(theme ? theme.subtopics : []);
      setSelectedSubtopic("");
      setGeneratedContent(null);
    }
  }, [selectedTheme]);

  const handleGenerate = async () => {
    if (!selectedTheme || !selectedSubtopic || !selectedOutputType) {
      toast({
        title: "Selection Required",
        description: "Please select theme, subtopic, and output type to generate insight.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const theme = mockData.themes.find(t => t.id === selectedTheme);
    const subtopic = theme?.subtopics.find(s => s.id === selectedSubtopic);
    const outputData = subtopic?.outputs[selectedOutputType];
    
    if (outputData) {
      setGeneratedContent({
        theme: theme.name,
        subtopic: subtopic.name,
        outputType: selectedOutputType,
        content: outputData
      });
    }
    
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.content.text || generatedContent.content);
      toast({
        title: "Copied to Clipboard",
        description: "Content has been copied successfully.",
      });
    }
  };

  const scrollToExploration = () => {
    document.getElementById('exploration-panel').scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMantraAudio = () => {
    setMantraAudioPlaying(!mantraAudioPlaying);
    // Note: Audio implementation would go here
    toast({
      title: mantraAudioPlaying ? "Om Chant Stopped" : "Om Chant Playing",
      description: mantraAudioPlaying ? "Sacred sound paused" : "Let the ancient vibration guide you",
    });
  };

  return (
    <div className="min-h-screen cosmic-background">
      {/* Visual Invocation - Slideshow at Top */}
      <SacredSlideshow isTopSection={true} />

      {/* Floating Sanskrit Glyphs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 text-6xl text-saffron-gold/10 animate-pulse sanskrit-glyph">ॐ</div>
        <div className="absolute top-40 right-20 text-4xl text-copper-bronze/10 animate-bounce sanskrit-glyph">श्री</div>
        <div className="absolute bottom-40 left-20 text-5xl text-mystic-teal/10 animate-pulse sanskrit-glyph">गं</div>
        <div className="absolute bottom-20 right-10 text-3xl text-saffron-gold/10 animate-bounce sanskrit-glyph">हरि</div>
        <div className="absolute top-1/2 left-1/4 text-4xl text-copper-bronze/8 animate-pulse sanskrit-glyph">ह्रीं</div>
        <div className="absolute top-1/3 right-1/3 text-3xl text-mystic-teal/8 animate-bounce sanskrit-glyph">क्लीं</div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          {/* Audio Toggle */}
          <div className="absolute top-0 right-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="text-saffron-gold hover:text-ivory-sand hover:bg-charcoal-indigo/50 border border-mystic-teal/30"
            >
              {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
          </div>

          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Crown className="h-12 w-12 text-saffron-gold" />
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-saffron-gold via-copper-bronze to-ivory-sand bg-clip-text text-transparent font-serif">
                Itihasa-AI
              </h1>
              <Building className="h-12 w-12 text-saffron-gold" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold high-contrast-text font-serif leading-tight">
              Uncover the Forgotten Wisdom of Bharat
            </h2>
            
            <p className="text-xl accent-text max-w-2xl mx-auto leading-relaxed font-body">
              Explore real thinkers, texts, and artistic heritage buried in time. 
              Journey through the sacred knowledge of our ancestors.
            </p>
            
            <Button 
              onClick={scrollToExploration}
              size="lg"
              className="flame-button font-semibold px-8 py-4 text-lg rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Exploring
            </Button>
          </div>
        </div>
      </section>

      {/* Sacred Mantra Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <Card className="mantra-fade-in bg-gradient-to-br from-soft-ivory/95 via-ivory-sand/90 to-copper-bronze/20 backdrop-blur-sm border-mystic-teal/30 shadow-2xl card-texture sacred-border">
            <CardContent className="py-12 px-8 text-center relative">
              {/* Audio Toggle Button */}
              <div className="absolute top-6 right-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMantraAudio}
                  className="text-charcoal-indigo hover:text-deep-charcoal hover:bg-saffron-gold/20 transition-all duration-300"
                >
                  {mantraAudioPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>

              {/* Sanskrit Mantra */}
              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-bold text-charcoal-indigo mantra-sanskrit font-devanagari leading-relaxed">
                  ॐ इत्येतदक्षरं इदं सर्वम्
                </h2>
                
                {/* Transliteration */}
                <p className="text-2xl md:text-3xl text-deep-charcoal italic font-body font-medium leading-relaxed tracking-wide">
                  Om ity etad akṣaram idam sarvam
                </p>
                
                {/* Meaning */}
                <p className="text-lg md:text-xl text-charcoal-indigo/80 font-body leading-relaxed max-w-2xl mx-auto">
                  "Om is this whole universe."
                </p>
                
                {/* Source Attribution */}
                <div className="pt-4 border-t border-mystic-teal/30">
                  <p className="text-sm text-copper-bronze font-medium">
                    — Mandukya Upanishad
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Exploration Panel */}
      <section id="exploration-panel" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold heading-text font-serif mb-4">
              Sacred Knowledge Explorer
            </h3>
            <p className="accent-text text-lg">
              Select your path to discover hidden truths of Indian heritage
            </p>
          </div>

          <Card className="bg-gradient-to-br from-charcoal-indigo/90 via-deep-charcoal/30 to-charcoal-indigo/90 backdrop-blur-sm border-mystic-teal/30 shadow-2xl sacred-glow">
            <CardHeader>
              <CardTitle className="text-2xl high-contrast-text font-serif flex items-center">
                <Scroll className="mr-3 h-6 w-6 text-saffron-gold" />
                Choose Your Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="accent-text font-medium">Theme</label>
                  <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                    <SelectTrigger className="bg-charcoal-indigo/50 border-mystic-teal/30 text-ivory-sand">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-charcoal-indigo border-mystic-teal/30">
                      {mockData.themes.map((theme) => (
                        <SelectItem key={theme.id} value={theme.id} className="text-ivory-sand hover:bg-deep-charcoal/50">
                          {theme.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="accent-text font-medium">Subtopic</label>
                  <Select value={selectedSubtopic} onValueChange={setSelectedSubtopic} disabled={!selectedTheme}>
                    <SelectTrigger className="bg-charcoal-indigo/50 border-mystic-teal/30 text-ivory-sand">
                      <SelectValue placeholder="Select subtopic" />
                    </SelectTrigger>
                    <SelectContent className="bg-charcoal-indigo border-mystic-teal/30">
                      {availableSubtopics.map((subtopic) => (
                        <SelectItem key={subtopic.id} value={subtopic.id} className="text-ivory-sand hover:bg-deep-charcoal/50">
                          {subtopic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="accent-text font-medium">Output Type</label>
                  <Select value={selectedOutputType} onValueChange={setSelectedOutputType}>
                    <SelectTrigger className="bg-charcoal-indigo/50 border-mystic-teal/30 text-ivory-sand">
                      <SelectValue placeholder="Select output" />
                    </SelectTrigger>
                    <SelectContent className="bg-charcoal-indigo border-mystic-teal/30">
                      {mockData.outputTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id} className="text-ivory-sand hover:bg-deep-charcoal/50">
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !selectedTheme || !selectedSubtopic || !selectedOutputType}
                  size="lg"
                  className="flame-button font-semibold px-12 py-3 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-ivory-sand border-t-transparent mr-2"></div>
                      Generating Insight...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Insight
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content Output Panel */}
      {generatedContent && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-ivory-sand/95 to-soft-ivory/95 backdrop-blur-sm border-mystic-teal/50 shadow-2xl sacred-glow">
              <CardHeader className="border-b border-mystic-teal/30">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-charcoal-indigo font-serif mb-2">
                      {generatedContent.subtopic}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-saffron-gold text-charcoal-indigo">
                        {generatedContent.theme}
                      </Badge>
                      <Badge variant="outline" className="border-mystic-teal text-copper-bronze">
                        {mockData.outputTypes.find(t => t.id === generatedContent.outputType)?.name}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="border-mystic-teal text-copper-bronze hover:bg-saffron-gold/20"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-mystic-teal text-copper-bronze hover:bg-saffron-gold/20"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ScrollArea className="h-96">
                  <div className="prose prose-slate max-w-none">
                    {generatedContent.outputType === 'visual_prompt' ? (
                      <pre className="bg-charcoal-indigo/10 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap border border-mystic-teal/30">
                        {generatedContent.content}
                      </pre>
                    ) : (
                      <div className="text-charcoal-indigo leading-relaxed space-y-4">
                        {typeof generatedContent.content === 'object' ? (
                          <>
                            <p className="text-lg">{generatedContent.content.text}</p>
                            {generatedContent.content.keyPoints && (
                              <div>
                                <h4 className="font-semibold mb-2">Key Points:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                  {generatedContent.content.keyPoints.map((point, index) => (
                                    <li key={index}>{point}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-lg leading-relaxed">{generatedContent.content}</p>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-mystic-teal/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Separator className="bg-mystic-teal/20" />
          <p className="accent-text italic font-serif text-lg">
            "A digital offering to the timeless legacy of Sanatan Dharma"
          </p>
          <p className="text-saffron-gold/60 text-sm">
            Built by Prem Kumar Dubey with Copilot
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;