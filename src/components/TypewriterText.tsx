"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function TypewriterText({ text, delay = 50, className = "" }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCaret, setShowCaret] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (!isReady) return;
    
    setDisplayedText("");
    let currentIndex = 0;
    const typingTimer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingTimer);
      }
    }, delay);

    return () => {
      clearInterval(typingTimer);
    };
  }, [text, delay, isReady]);

  useEffect(() => {
    const caretTimer = setInterval(() => {
      setShowCaret(prev => !prev);
    }, 530);

    return () => {
      clearInterval(caretTimer);
    };
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <span 
        className={`${showCaret ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
        aria-hidden="true"
      >
        |
      </span>
    </span>
  );
}
