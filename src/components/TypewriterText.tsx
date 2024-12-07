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
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (!isReady) return;

    if (displayedText && text !== displayedText) {
      setIsDeleting(true);
      setIsTyping(true);
      let currentText = displayedText;
      const deleteTimer = setInterval(() => {
        if (currentText.length > 0) {
          currentText = currentText.slice(0, -1);
          setDisplayedText(currentText);
        } else {
          clearInterval(deleteTimer);
          setIsDeleting(false);
          startTyping();
        }
      }, delay);

      return () => clearInterval(deleteTimer);
    } else {
      startTyping();
    }
  }, [text, delay, isReady]);

  const startTyping = () => {
    setIsTyping(true);
    let currentIndex = 0;
    const typingTimer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingTimer);
        setIsTyping(false);
      }
    }, delay);

    return () => clearInterval(typingTimer);
  };

  useEffect(() => {
    const caretTimer = setInterval(() => {
      setShowCaret(prev => !prev);
    }, 530);

    return () => clearInterval(caretTimer);
  }, []);

  return (
    <span className={`relative ${className}`}>
      <span className="transition-opacity duration-300">
        {displayedText}
      </span>
      <span 
        className={`ml-0.5 inline-block transition-opacity duration-150 ${(showCaret && (isTyping || isDeleting)) ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      >
        |
      </span>
    </span>
  );
}
