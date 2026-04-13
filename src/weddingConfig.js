const weddingConfig = {
  names: {
    groom: "Prafull",
    bride: "Megha",
    monogram: "P & M"
  },
  date: "2026-05-03T19:00:00", // Full date for countdown
  displayDate: "03 May 2026",
  colors: {
    cream: '#FDFCF0',
    gold: '#C9A84C',
    maroon: '#800000',
    beige: '#F5F5DC',
    pink: '#FFD1DC'
  },
  hero: {
    title: "Prafull ❤️ Megha",
    subtitle: "We're Getting Married",
    buttonText: "View Invitation"
  },
  couple: {
    groom: {
      name: "Prafull",
      parents: "Son of Mrs. Vranda & Mr. Tundilal Rahangdale",
      // Put your groom image in public/assets/images/groom.jpg
      image: "/assets/images/groom.jpg" 
    },
    bride: {
      name: "Megha",
      parents: "Daughter of Mrs. Vandana  & Mr. uday singh Thakur",
      // Put your bride image in public/assets/images/bride.jpg
      image: "/assets/images/bride.jpg"
    }
  },
  events: [
    {
      title: "Sangeet & Mehndi Ceremony",
      date: "02 May 2026 (Saturday)",
      time: "Evening onwards",
      location: "Residence – Khairgaon",
      icon: "💍",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12953.302528648308!2d80.12949140561038!3d22.24329756340274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1776061041184!5m2!1sen!2sin",
navigateLink: "https://maps.app.goo.gl/E3x892b3nNkyxENL9"
    },
    {
      title: "Haldi & Faldan Ceremony",
      date: "03 May 2026 (Sunday)",
      time: "Afternoon onwards",
       location: "Residence – Khairgaon",
      icon: "💍",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12953.302528648308!2d80.12949140561038!3d22.24329756340274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1776061041184!5m2!1sen!2sin",
navigateLink: "https://maps.app.goo.gl/E3x892b3nNkyxENL9"
    },
    {
      title: "Wedding Ceremony",
      date: " 03 May 2026(Sunday)",
      time: "10:00 PM onwards",
      note: "Baraat leave: 04:00 PM",
      location: "Adarsh Marriage Lown Barghat,Seoni",
      icon: "💍",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3086.7587650592677!2d79.75625987433645!3d22.036896852393163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2a974504927f6d%3A0xe75725a559bb8f32!2sAdarsh%20Marriage%20celebration%20Lawn%20Barghat!5e1!3m2!1sen!2sin!4v1776061634953!5m2!1sen!2sin",
navigateLink: "https://maps.app.goo.gl/kD2i5ftNBXXpCVqN6"
    },
    {
      title: "Reception Party",
      date: "04 May 2026 (Monday)",
      time: "Evening onwards",
       location: "Residence – Khairgaon",
      icon: "💍",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12953.302528648308!2d80.12949140561038!3d22.24329756340274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1776061041184!5m2!1sen!2sin",
navigateLink: "https://maps.app.goo.gl/E3x892b3nNkyxENL9"
    }
  ],
  venue: {
    name: "Adarsh Marrisge Lown",
    address: "Adarsh Marriage Lown Barghat,Seoni",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3086.7587650592677!2d79.75625987433645!3d22.036896852393163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2a974504927f6d%3A0xe75725a559bb8f32!2sAdarsh%20Marriage%20celebration%20Lawn%20Barghat!5e1!3m2!1sen!2sin!4v1776061634953!5m2!1sen!2sin",
navigateLink: "https://maps.app.goo.gl/kD2i5ftNBXXpCVqN6"
  },
  contact: {
    address: "At Khairgaon, Changotola, Balaghat",
    phones: ["+91 8120098709", "+91 9131686971"]
  },
  audio: {
    // Put your music file in public/assets/music/bg-music.mp3
    url: '/assets/music/bg-music.mp3',
    volume: 0.5
  },
  images: {
    // Put your hero image in public/assets/images/hero.jpg
    hero: "/assets/images/hero.jpg",
    groom: "/assets/images/groom.jpg",
    bride: "/assets/images/bride.jpg",
    // Put your gallery images in public/assets/images/gallery1.jpg, gallery2.jpg, etc.
    gallery: [
      "/assets/images/gallery1.jpg",
      "/assets/images/gallery2.jpg",
      "/assets/images/gallery3.jpg",
      "/assets/images/gallery4.jpg",
      "/assets/images/gallery5.jpg",
      "/assets/images/gallery6.jpg"
    ]
  }
}

export default weddingConfig
