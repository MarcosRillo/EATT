// src/app/components/GoogleMap.jsx
import React from "react";

function GoogleMap({ url }) {
  return (
    <iframe
      src={url}
      width="100%"
      height="300"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}

export default GoogleMap;
