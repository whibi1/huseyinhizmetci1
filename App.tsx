import React, { useState, useEffect, createContext, useContext } from 'react';
import { LanguageCode, ContentData } from './types';
import { CONTENT } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseMe from './components/WhyChooseMe';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Language Context
interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: ContentData;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<LanguageCode>('tr');

  // Handle document direction for Arabic
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: CONTENT[language],
    isRTL: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className={`min-h-screen bg-slate-50 font-sans text-slate-800 ${language === 'ar' ? 'font-ar' : ''}`}>
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <WhyChooseMe />
          <Gallery />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageContext.Provider>
  );
};

export default App;