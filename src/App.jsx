import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Howl } from 'howler';
import weddingConfig from './weddingConfig';
import { useCountdown } from './hooks/useCountdown';

let sharedHowl = null;

// --- Components ---

const FallingPetals = () => {
  const petals = Array.from({ length: 12 });
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: -100, 
            x: Math.random() * 100 + "%", 
            rotate: 0,
            opacity: 0 
          }}
          animate={{ 
            y: "110vh", 
            x: (Math.random() * 100 - 10) + "%", 
            rotate: 360,
            opacity: [0, 0.7, 0.7, 0] 
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute text-rose-300/40 text-2xl"
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
};

const SectionDivider = () => (
  <div className="flex justify-center items-center py-12 relative">
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <svg width="100%" height="100" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path d="M0,50 Q300,0 600,50 T1200,50" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
    <div className="mx-8 text-gold flex items-center gap-4">
      <div className="text-2xl opacity-40">❈</div>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L14.5 9H21L15.5 13.5L18 21L12 16.5L6 21L8.5 13.5L3 9H9.5L12 2Z" />
      </svg>
      <div className="text-2xl opacity-40">❈</div>
    </div>
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
  </div>
);

const Hero = ({ onExplore }) => {
  const { days, hours, minutes, seconds } = useCountdown(weddingConfig.date);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <img 
          src={weddingConfig.images.hero} 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-transparent to-cream/80"></div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 max-w-4xl"
      >
        <div className="mb-8 inline-block px-6 py-2 border-y border-gold/30">
          <span className="font-poppins text-xs tracking-[0.4em] uppercase text-gold">Save The Date</span>
        </div>
        
        <h1 className="font-playfair text-6xl md:text-9xl text-maroon mb-8 leading-tight tracking-tight">
          {weddingConfig.names.groom} <span className="text-gold italic">&</span> {weddingConfig.names.bride}
        </h1>
        
        <div className="font-playfair text-xl md:text-3xl text-maroon/70 mb-16 italic tracking-wide">
          Are getting married on {weddingConfig.displayDate}
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 md:gap-12 justify-center mb-20 max-w-2xl mx-auto">
          {[
            { label: 'Days', value: days },
            { label: 'Hours', value: hours },
            { label: 'Mins', value: minutes },
            { label: 'Secs', value: seconds },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-full border-2 border-gold/40 mb-3 bg-white/60 backdrop-blur-md shadow-lg group">
                <span className="text-2xl md:text-4xl font-playfair text-maroon font-bold drop-shadow-sm group-hover:scale-110 transition-transform">{item.value.toString().padStart(2, '0')}</span>
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-maroon font-poppins font-bold bg-white/40 px-2 py-1 rounded-full">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05, letterSpacing: "0.3em" }}
          whileTap={{ scale: 0.95 }}
          onClick={onExplore}
          className="bg-maroon text-cream px-12 py-5 rounded-full font-poppins text-xs tracking-[0.2em] uppercase hover:bg-maroon/90 transition-all shadow-2xl border border-gold/30"
        >
          {weddingConfig.hero.buttonText}
        </motion.button>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gold opacity-40 cursor-pointer"
        onClick={onExplore}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
};

const Couple = () => (
  <section id="couple" className="py-24 px-6 max-w-6xl mx-auto overflow-hidden">
    <SectionDivider />
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center font-playfair text-5xl md:text-7xl text-maroon mb-20 italic"
    >
      Meet The Couple
    </motion.h2>
    
    <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center">
      {/* Groom */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring" }}
        className="text-center relative group"
      >
        <div className="relative mb-10 inline-block">
          <div className="absolute -inset-4 border border-gold/20 rounded-full transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110"></div>
          <div className="absolute -inset-2 border-2 border-gold/40 rounded-full"></div>
          <img 
            src={weddingConfig.images.groom} 
            alt={weddingConfig.names.groom} 
            className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-full shadow-2xl transition-all duration-700 group-hover:grayscale-0 grayscale-[30%]" 
          />
        </div>
        <h3 className="font-playfair text-4xl text-maroon mb-3 tracking-wide">{weddingConfig.couple.groom.name}</h3>
        <p className="text-gold uppercase tracking-[0.3em] text-[10px] mb-6 font-poppins font-semibold">The Groom</p>
        <div className="max-w-xs mx-auto">
          <p className="text-maroon/60 font-playfair text-lg leading-relaxed italic border-t border-gold/10 pt-4">
            {weddingConfig.couple.groom.parents}
          </p>
        </div>
      </motion.div>

      {/* Bride */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring" }}
        className="text-center relative group"
      >
        <div className="relative mb-10 inline-block">
          <div className="absolute -inset-4 border border-gold/20 rounded-full transition-transform duration-700 group-hover:-rotate-45 group-hover:scale-110"></div>
          <div className="absolute -inset-2 border-2 border-gold/40 rounded-full"></div>
          <img 
            src={weddingConfig.images.bride} 
            alt={weddingConfig.names.bride} 
            className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-full shadow-2xl transition-all duration-700 group-hover:grayscale-0 grayscale-[30%]" 
          />
        </div>
        <h3 className="font-playfair text-4xl text-maroon mb-3 tracking-wide">{weddingConfig.couple.bride.name}</h3>
        <p className="text-gold uppercase tracking-[0.3em] text-[10px] mb-6 font-poppins font-semibold">The Bride</p>
        <div className="max-w-xs mx-auto">
          <p className="text-maroon/60 font-playfair text-lg leading-relaxed italic border-t border-gold/10 pt-4">
            {weddingConfig.couple.bride.parents}
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

const Events = () => (
  <section id="events" className="py-32 bg-beige/20 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cream to-transparent"></div>
    <div className="max-w-5xl mx-auto px-6 relative z-10">
      <SectionDivider />
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-playfair text-5xl md:text-7xl text-maroon mb-24 italic"
      >
        Wedding Festivities
      </motion.h2>
      
      <div className="relative border-l border-gold/20 ml-4 md:ml-0 md:border-none space-y-24">
        {weddingConfig.events.map((event, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="flex-1 w-full">
              <div className={`glass-card p-10 rounded-3xl relative overflow-hidden border-2 border-gold/20 hover:border-gold/40 transition-all duration-500 hover:shadow-2xl group bg-white/40 backdrop-blur-md`}>
                <div className="absolute -top-10 -right-10 w-32 h-32 border-2 border-gold/10 rounded-full group-hover:scale-110 transition-transform"></div>
                <div className="absolute top-0 right-0 p-6 text-6xl opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                  {event.icon}
                </div>
                
                <div className="mb-6">
                  <span className="inline-block px-4 py-1 bg-gold/10 text-gold text-[10px] uppercase tracking-[0.2em] rounded-full mb-4 font-bold">
                    {event.date}
                  </span>
                  <h3 className="font-playfair text-3xl text-maroon mb-2">{event.title}</h3>
                  <p className="text-gold italic font-playfair text-xl mb-6">{event.time}</p>
                </div>

                <div className="space-y-4 border-t border-gold/10 pt-6">
                  <div className="flex items-start gap-4">
                    <span className="text-gold text-xl">📍</span>
                    <div className="flex-1">
                      <p className="text-maroon/80 font-poppins font-semibold">{event.location}</p>
                      {event.address && <p className="text-maroon/50 text-sm font-poppins italic mt-1">{event.address}</p>}
                    </div>
                  </div>
                  
                  {event.navigateLink && (
                    <div className="pt-4">
                      <motion.a 
                        href={event.navigateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 text-gold hover:text-maroon text-[10px] uppercase tracking-[0.2em] font-bold transition-colors"
                      >
                        <span>Get Directions</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </motion.a>
                    </div>
                  )}

                  {event.note && (
                    <div className="mt-6 flex items-center gap-3 text-gold text-[11px] uppercase tracking-widest font-bold">
                      <span className="w-8 h-[1px] bg-gold/30"></span>
                      Note: {event.note}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex flex-col items-center justify-center relative w-16">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold z-10 bg-white shadow-xl">
                {i + 1}
              </div>
              {i < weddingConfig.events.length - 1 && (
                <div className="absolute top-12 bottom-[-96px] w-[1px] bg-gradient-to-b from-gold/30 to-transparent"></div>
              )}
            </div>
            
            <div className="flex-1 hidden md:block"></div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Venue = () => (
  <section id="venue" className="py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <SectionDivider />
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-playfair text-5xl md:text-7xl text-maroon mb-24 italic"
      >
        The Celebration Venue
      </motion.h2>
      
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="rounded-[40px] overflow-hidden shadow-2xl h-[500px] relative group border-8 border-white"
        >
          <iframe
            src={weddingConfig.venue.mapsEmbed}
            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 border-none"
            allowFullScreen=""
            loading="lazy"
            title="Venue Location"
          ></iframe>
          <div className="absolute top-8 left-8 bg-maroon text-cream px-6 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 shadow-2xl border border-gold/30">
            <motion.span 
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >📍</motion.span>
            View on Map
          </div>
        </motion.div>

        <div className="text-center lg:text-left space-y-10">
          <div className="inline-block px-6 py-2 bg-gold/5 border border-gold/20 rounded-full">
            <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">Main Venue</span>
          </div>
          <h3 className="font-playfair text-5xl text-maroon leading-tight">{weddingConfig.venue.name}</h3>
          <p className="text-maroon/60 font-playfair text-xl leading-relaxed italic max-w-md mx-auto lg:mx-0">
            {weddingConfig.venue.address}
          </p>
          <div className="pt-6">
            <motion.a 
              href={weddingConfig.venue.navigateLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: "#800000", color: "#FFF8EE" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 bg-transparent border-2 border-maroon text-maroon px-10 py-4 rounded-full font-poppins text-xs tracking-[0.2em] uppercase transition-all shadow-xl font-bold"
            >
              <span>Get Directions</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 3L14.5 21L11.5 12.5L3 9.5L21 3Z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  // 1. Define the names in an array here
  const contactNames = ["Mr.Tundilal Rahangdale", "Mr.Prafull Rahangdale"];

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden bg-beige/10">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <SectionDivider />
        <p className="text-maroon/60 font-playfair text-xl mb-20 max-w-lg mx-auto leading-relaxed italic">
          Your presence would make our day truly special. Please reach out to the families for any information.
        </p>

        <div className="grid sm:grid-cols-2 gap-10 mb-20">
          {weddingConfig.contact.phones.map((phone, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="glass-card p-10 rounded-[40px] border-2 border-gold/20 flex flex-col items-center hover:border-gold/40 transition-all duration-500 hover:shadow-2xl bg-white/40 backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -left-10 w-32 h-32 border-2 border-gold/10 rounded-full"></div>
              
              {/* Change emoji based on side if you want */}
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-6 text-gold text-2xl">
                {i === 0 ? '🤵' : '🤵'} 
              </div>
              
              {/* 2. Use contactNames[i] here */}
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4 font-bold">
                {contactNames[i] || `Contact Person ${i + 1}`}
              </span>

              <span className="font-playfair text-3xl text-maroon mb-8 tracking-wide font-bold">{phone}</span>
              
              <div className="flex gap-6">
                {/* Phone Link */}
                <motion.a 
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 bg-maroon text-cream rounded-full flex items-center justify-center shadow-xl hover:bg-maroon/90 transition-all border border-gold/20"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.79 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </motion.a>

                {/* WhatsApp Link */}
                <motion.a 
                  href={`https://wa.me/${phone.replace(/[+\s]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl transition-all border border-white/20"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.347-.883-.785-1.478-1.753-1.65-2.051-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.87 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.189-1.624c1.732.944 3.691 1.441 5.682 1.442h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-maroon/40 font-poppins text-[10px] tracking-[0.4em] uppercase border-t border-gold/10 pt-12">
          {weddingConfig.contact.address}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 bg-maroon text-cream text-center">
    <h2 className="font-playfair text-3xl mb-4 italic">{weddingConfig.names.groom} ❤️ {weddingConfig.names.bride}</h2>
    <p className="font-poppins text-xs uppercase tracking-[0.3em] opacity-60 mb-8">Wedding Celebration 2026</p>
    <div className="text-[10px] uppercase tracking-widest opacity-40">
      Made with Love for Prafull & Megha
    </div>
  </footer>
);

function EnvelopeOverlay({ onOpen }) {
  const [opened, setOpened] = useState(false);
  const handleClick = () => {
    if (!opened) {
      setOpened(true);
      setTimeout(onOpen, 1500);
    }
  };
  
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-cream [perspective:2000px] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative w-[90vw] max-w-[500px] aspect-[3/4] flex items-center justify-center">
        {/* Doors Wrapper */}
        <motion.div
          className="absolute inset-0 flex"
          initial={false}
        >
          {/* Left Door */}
          <motion.div
            className="flex-1 bg-[#fffdf5] border-r border-gold/30 shadow-2xl relative overflow-hidden"
            animate={{ rotateY: opened ? -120 : 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden', zIndex: 2 }}
          >
            {/* Elegant Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="absolute inset-6 border-2 border-gold/30 rounded-sm"></div>
            <div className="absolute inset-8 border border-gold/10 rounded-sm"></div>
            
            {/* Corner Decorations */}
            <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-gold/50 rounded-tl-xl"></div>
            <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-gold/50 rounded-bl-xl"></div>
            
            {/* Indian Mandala Design Left */}
            <div className="absolute -left-24 -top-24 w-72 h-72 border-[1px] border-gold/20 rounded-full opacity-30"></div>
            <div className="absolute -left-12 -top-12 w-48 h-48 border-[1px] border-gold/30 rounded-full opacity-30"></div>
            
            {/* Om Symbols */}
            <div className="absolute left-10 top-20 text-gold/20 text-6xl font-serif">ॐ</div>
            <div className="absolute left-10 bottom-20 text-gold/20 text-6xl font-serif">ॐ</div>
            
            {/* Center Handle Line */}
            <div className="absolute inset-0 flex items-center justify-end pr-2 opacity-30">
              <div className="w-1.5 h-48 bg-gradient-to-b from-transparent via-gold/50 to-transparent rounded-full"></div>
            </div>
          </motion.div>

          {/* Right Door */}
          <motion.div
            className="flex-1 bg-[#fffdf5] border-l border-gold/30 shadow-2xl relative overflow-hidden"
            animate={{ rotateY: opened ? 120 : 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            style={{ transformOrigin: 'right center', backfaceVisibility: 'hidden', zIndex: 2 }}
          >
            {/* Elegant Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="absolute inset-6 border-2 border-gold/30 rounded-sm"></div>
            <div className="absolute inset-8 border border-gold/10 rounded-sm"></div>
            
            {/* Corner Decorations */}
            <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-gold/50 rounded-tr-xl"></div>
            <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-gold/50 rounded-br-xl"></div>

            {/* Indian Mandala Design Right */}
            <div className="absolute -right-24 -bottom-24 w-72 h-72 border-[1px] border-gold/20 rounded-full opacity-30"></div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 border-[1px] border-gold/30 rounded-full opacity-30"></div>
            
            {/* Om Symbols - Correctly Oriented */}
            <div className="absolute right-10 top-20 text-gold/20 text-6xl font-serif">ॐ</div>
            <div className="absolute right-10 bottom-20 text-gold/20 text-6xl font-serif">ॐ</div>
            
            {/* Center Handle Line */}
            <div className="absolute inset-0 flex items-center justify-start pl-2 opacity-30">
              <div className="w-1.5 h-48 bg-gradient-to-b from-transparent via-gold/50 to-transparent rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Inner Content (Revealed) */}
        <div className="absolute inset-0 bg-cream flex flex-col items-center justify-center p-12 text-center border border-gold/10 shadow-inner">
          <div className="w-24 h-24 border border-gold/20 rounded-full mb-8 flex items-center justify-center">
            <span className="font-playfair text-3xl text-gold">P & M</span>
          </div>
          <h2 className="font-playfair text-2xl text-maroon mb-4 tracking-widest uppercase">The Wedding of</h2>
          <div className="font-playfair text-4xl text-maroon italic">Prafull & Megha</div>
        </div>

        {/* Seal Button */}
        <motion.button
          onClick={handleClick}
          initial={{ scale: 1 }}
          animate={{ 
            scale: opened ? 0 : 1,
            rotate: opened ? 180 : 0,
            opacity: opened ? 0 : 1
          }}
          transition={{ duration: 0.8, ease: "backIn" }}
          className="absolute z-[10] w-48 h-48 rounded-full shadow-[0_20px_60px_rgba(158,127,31,0.5)] cursor-pointer group flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #d7b865, #b9952a 60%, #9e7f1f)',
          }}
        >
          <div className="absolute inset-2 border-2 border-white/30 rounded-full"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <img 
              src="/assets/images/ganesh.png" 
              alt="Ganesh" 
              className="w-32 h-32 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-500"
            
            />
            Tap to open
          </div>
          
          {/* Decorative Ring */}
          <div className="absolute inset-[-15px] border-2 border-gold/30 rounded-full animate-pulse"></div>
        </motion.button>
      </div>

      {/* Footer text */}
      {!opened && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-12 text-gold/60 font-poppins text-[10px] tracking-[0.4em] uppercase"
        >
          A Special Day Awaits
        </motion.div>
      )}
    </div>
  );
}

export default function App() {
  const [muted, setMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('open') !== '1';
    } catch {
      return true;
    }
  });
  const soundRef = useRef(null);

  const ensureHowl = () => {
    if (typeof window === 'undefined') return;
    if (!sharedHowl) {
      sharedHowl = new Howl({
        src: [weddingConfig.audio.url],
        html5: true,
        loop: true,
        volume: weddingConfig.audio.volume,
        autoplay: false
      });
    }
    soundRef.current = sharedHowl;
  };

  useEffect(() => {
    if (import.meta?.hot) {
      import.meta.hot.dispose(() => {
        if (sharedHowl) {
          sharedHowl.unload();
          sharedHowl = null;
        }
      });
    }
  }, []);

  const toggleMute = () => {
    ensureHowl();
    const s = soundRef.current;
    if (!s) return;
    if (muted) {
      if (!s.playing()) s.play();
      s.mute(false);
    } else {
      s.mute(true);
    }
    setMuted((m) => !m);
  };

  const scrollToInvitation = () => {
    const el = document.getElementById('couple');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.body.style.overflow = showOverlay ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showOverlay]);

  const handleEnvelopeOpen = () => {
    setShowOverlay(false);
    ensureHowl();
    const s = soundRef.current;
    if (s) {
      if (!s.playing()) s.play();
      s.mute(false);
      setMuted(false);
    }
  };

  return (
    <div className="app selection:bg-gold selection:text-cream overflow-x-hidden bg-cream relative">
      {showOverlay && <EnvelopeOverlay onOpen={handleEnvelopeOpen} />}
      
      <FallingPetals />

      {/* Background Music Toggle */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-[90] w-14 h-14 bg-white/90 backdrop-blur-md border border-gold/30 rounded-full flex items-center justify-center shadow-2xl text-maroon hover:bg-white transition-all group"
      >
        <div className="absolute inset-[-4px] border border-gold/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
        {muted ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
        )}
      </motion.button>

      {/* Floating Stay in Touch Button */}
      {/* <motion.a
        href="#contact"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] bg-maroon text-cream px-10 py-4 rounded-full font-poppins text-[10px] tracking-[0.3em] uppercase shadow-2xl hover:bg-gold transition-all border-2 border-gold/50 font-bold"
      >
        Stayin Touch
      </motion.a> */}

      <Hero onExplore={scrollToInvitation} />
      <Couple />
      <Events />
      <Venue />
      <Contact />
      <Footer />
    </div>
  );
}
