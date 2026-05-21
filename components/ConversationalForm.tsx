"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Check, CornerDownLeft, Sparkles, MessageCircle, Languages } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'name',
    type: 'text',
    prompt: {
      en: "Hi there! Let's start with your name.",
      hi: "नमस्ते! आइए आपके नाम से शुरू करते हैं।"
    },
    placeholder: {
      en: "Type your name here...",
      hi: "अपना नाम यहाँ लिखें..."
    },
    required: true
  },
  {
    id: 'phone',
    type: 'tel',
    prompt: {
      en: "Nice to meet you, {{name}}! What's the best phone number to reach you?",
      hi: "आपसे मिलकर अच्छा लगा, {{name}}! आपसे संपर्क करने के लिए सबसे अच्छा फ़ोन नंबर क्या है?"
    },
    placeholder: {
      en: "Enter your phone number...",
      hi: "अपना फ़ोन नंबर दर्ज करें..."
    },
    required: true
  },
  {
    id: 'bill',
    type: 'text',
    prompt: {
      en: "Got it. Roughly how much is your average monthly electricity bill?",
      hi: "समझ गए। आपका औसत मासिक बिजली बिल लगभग कितना है?"
    },
    placeholder: {
      en: "e.g. ₹3000",
      hi: "उदा. ₹3000"
    },
    required: true
  },
  {
    id: 'timeline',
    type: 'choice',
    prompt: {
      en: "When are you looking to install your solar system?",
      hi: "आप अपना सोलर सिस्टम कब लगवाना चाहते हैं?"
    },
    options: [
      { 
        label: { en: "Immediately", hi: "तुरंत" }, 
        value: "immediate" 
      },
      { 
        label: { en: "Within a month", hi: "एक महीने के अंदर" }, 
        value: "within_month" 
      },
      { 
        label: { en: "After a month", hi: "एक महीने के बाद" }, 
        value: "after_month" 
      }
    ],
    required: true
  },
  {
    id: 'address',
    type: 'textarea',
    prompt: {
      en: "Almost done! What is the installation address?",
      hi: "बस हो गया! इंस्टॉलेशन का पता क्या है?"
    },
    placeholder: {
      en: "Enter your full address...",
      hi: "अपना पूरा पता दर्ज करें..."
    },
    required: true
  }
];

const UI_STRINGS = {
  en: {
    form_title: "Solar Form",
    error_required: "Please fill this out to continue.",
    submit: "Submit",
    ok: "OK",
    press: "press",
    enter: "Enter",
    all_set: "You're all set!",
    thanks: "Thanks for sharing, {{name}}. We've received your details and will be in touch shortly.",
    start_over: "Start Over",
    toggle_lang: "हिंदी में बदलें"
  },
  hi: {
    form_title: "सोलर फ़ॉर्म",
    error_required: "आगे बढ़ने के लिए कृपया इसे भरें।",
    submit: "सबमिट करें",
    ok: "ठीक है",
    press: "दबाएं",
    enter: "Enter",
    all_set: "सब तैयार है!",
    thanks: "जानकारी देने के लिए धन्यवाद, {{name}}। हमें आपका विवरण मिल गया है और हम जल्द ही आपसे संपर्क करेंगे।",
    start_over: "फिर से शुरू करें",
    toggle_lang: "Switch to English"
  }
};

export default function ConversationalForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const inputRef = useRef<any>(null);
  const currentQuestion = QUESTIONS[currentStep];

  // Auto-focus input when step changes
  useEffect(() => {
    if (inputRef.current && !isAnimating) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [currentStep, isAnimating]);

  // Handle keyboard 'Enter' for next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && currentQuestion?.type !== 'textarea') {
        e.preventDefault();
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, answers, isAnimating, currentQuestion]);

  const handleInputChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    setError('');
  };

  const validateCurrentStep = () => {
    if (currentQuestion.required && !answers[currentQuestion.id]) {
      setError(`${UI_STRINGS.en.error_required} / ${UI_STRINGS.hi.error_required}`);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (isAnimating) return;
    if (!validateCurrentStep()) return;

    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsCompleted(true);
      }
      setIsAnimating(false);
      setError('');
    }, 400); // Animation duration
  };

  const handlePrev = () => {
    if (currentStep > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
        setError('');
      }, 400);
    }
  };

  const parseString = (str: string, lang = 'en') => {
    if (!str.includes('{{name}}')) return str;
    const fallback = lang === 'hi' ? 'दोस्त' : 'Friend';
    const name = answers['name'] || fallback;
    return str.replace('{{name}}', name);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30">
        <div className="animate-[fade-in-up_0.6s_ease-out] text-center max-w-2xl">
          <div className="bg-indigo-500/20 text-indigo-400 p-4 rounded-full inline-block mb-8">
            <Sparkles size={48} className="animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-purple-200">
            {UI_STRINGS.en.all_set}
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-indigo-300 mb-8">
            {UI_STRINGS.hi.all_set}
          </h2>
          <div className="text-xl text-neutral-400 mb-12 font-light space-y-4">
            <p>{parseString(UI_STRINGS.en.thanks, 'en')}</p>
            <p className="text-indigo-200/70 text-lg">{parseString(UI_STRINGS.hi.thanks, 'hi')}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors duration-200 flex items-center justify-center gap-3 mx-auto"
          >
            <span>{UI_STRINGS.en.start_over}</span>
            <span className="opacity-50">/</span>
            <span>{UI_STRINGS.hi.start_over}</span>
          </button>
        </div>
      </div>
    );
  }

  const renderInput = () => {
    const placeholderCombo = currentQuestion.placeholder 
      ? `${currentQuestion.placeholder.en} / ${currentQuestion.placeholder.hi}`
      : '';
    
    switch (currentQuestion.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <input
            ref={inputRef}
            type={currentQuestion.type}
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholderCombo}
            className="w-full bg-transparent border-b border-neutral-700/50 focus:border-indigo-400 outline-none text-2xl md:text-4xl py-4 placeholder:text-neutral-700 text-white transition-colors duration-300"
          />
        );
      case 'textarea':
        return (
          <textarea
            ref={inputRef}
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholderCombo}
            rows={3}
            className="w-full bg-transparent border-b border-neutral-700/50 focus:border-indigo-400 outline-none text-xl md:text-3xl py-4 placeholder:text-neutral-700 text-white transition-colors duration-300 resize-none"
          />
        );
      case 'choice':
        return (
          <div className="flex flex-col gap-3 mt-4">
            {currentQuestion.options?.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option.value;
              const shortcut = String.fromCharCode(65 + index);
              
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    handleInputChange(option.value);
                    setTimeout(() => handleNext(), 300); // Auto-advance on choice
                  }}
                  className={`group flex items-center justify-between w-full p-5 rounded-2xl border text-left transition-all duration-200 ${
                    isSelected 
                      ? 'bg-indigo-500/10 border-indigo-500 text-white' 
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded text-sm font-medium transition-colors ${
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700'
                    }`}>
                      {shortcut}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl md:text-2xl">{option.label.en}</span>
                      <span className="text-sm md:text-base text-indigo-300/70 mt-1">{option.label.hi}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="text-indigo-400" size={24} />}
                </button>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  const progress = ((currentStep) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Progress Bar */}
      <div className="w-full h-1 bg-neutral-900 fixed top-0 left-0 z-50">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="p-6 md:p-10 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <MessageCircle className="text-indigo-400" size={24} />
          <div className="flex flex-col">
            <span className="text-neutral-400 font-medium tracking-wide text-sm uppercase">{UI_STRINGS.en.form_title}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto px-6 md:px-12 py-10 z-10">
        
        {/* Animated Question Container */}
        <div 
          className={`transition-all duration-500 ease-in-out ${
            isAnimating 
              ? 'opacity-0 -translate-y-8 scale-95' 
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          {/* Question Number */}
          <div className="flex items-center gap-3 text-indigo-400 font-medium mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/10 text-sm">
              {currentStep + 1}
            </span>
            <span className="text-sm tracking-widest uppercase">
              <ArrowRight size={14} className="inline mr-2 opacity-50" />
            </span>
          </div>

          {/* Question Prompts (Bilingual) */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-100 mb-4 leading-[1.2]">
              {parseString(currentQuestion.prompt.en, 'en')}
            </h2>
            <h3 className="text-xl md:text-3xl font-light tracking-tight text-indigo-300 leading-[1.3]">
              {parseString(currentQuestion.prompt.hi, 'hi')}
            </h3>
          </div>

          {/* Input Area */}
          <div className="relative">
            {renderInput()}
            
            {/* Error Message */}
            <div className={`absolute -bottom-8 left-0 text-red-400 text-sm flex items-center transition-opacity duration-300 ${error ? 'opacity-100' : 'opacity-0'}`}>
              {error}
            </div>
          </div>

          {/* Action Buttons (OK / Enter) */}
          <div className="mt-12 flex items-center gap-4">
            <button
              onClick={handleNext}
              className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-neutral-200 transition-all active:scale-95"
            >
              <span className="flex items-center gap-2">
                {currentStep === QUESTIONS.length - 1 ? UI_STRINGS.en.submit : UI_STRINGS.en.ok}
                <span className="opacity-40">|</span>
                {currentStep === QUESTIONS.length - 1 ? UI_STRINGS.hi.submit : UI_STRINGS.hi.ok}
              </span>
              <Check size={18} className="opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>

            {currentQuestion.type !== 'choice' && currentQuestion.type !== 'textarea' && (
              <div className="hidden md:flex items-center gap-2 text-neutral-500 text-sm animate-pulse">
                <span>{UI_STRINGS.en.press}</span>
                <span className="font-semibold text-neutral-400 flex items-center gap-1 bg-neutral-900 px-2 py-1 rounded">
                  {UI_STRINGS.en.enter} <CornerDownLeft size={14} />
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="p-6 md:p-10 flex justify-end z-10">
        <div className="flex gap-2">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 0 || isAnimating}
            className="p-3 rounded-xl bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous question"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={handleNext}
            disabled={isAnimating}
            className="p-3 rounded-xl bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next question"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </footer>

      {/* Global styles for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
