// src/pages/LandingPage.js
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div>
      <Header />
      {/* Add margin to push content below the fixed header */}
      <main
        style={{
          paddingTop: '80px'
        }}
      >
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
