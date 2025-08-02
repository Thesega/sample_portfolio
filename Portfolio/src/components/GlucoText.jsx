import React, { useEffect, useState } from 'react';

const GlucoText = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Redefining the Way You Monitor';
  const typingSpeed = 70; // ms per character

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center pointer-events-none">
      <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">GLUCO TRACK</h1>
      <p className="text-xl md:text-2xl font-medium drop-shadow-lg">{typedText}</p>
    </div>
  );
};

export default GlucoText;
