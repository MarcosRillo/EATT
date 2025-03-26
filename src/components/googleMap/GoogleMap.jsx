// src/app/components/GoogleMap.jsx
import React from "react";

function GoogleMap({ url }) {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14241.265209601072!2d-65.24267831008302!3d-26.82989017912259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c6ef372d485%3A0x5364a96acedda853!2sHilton%20Garden%20Inn%20Tucuman!5e0!3m2!1ses!2sar!4v1743022464601!5m2!1ses!2sar"
      width="600"
      height="450"
      style={{border:0}}
      allowfullscreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}

export default GoogleMap;
