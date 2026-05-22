"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ArrowLeft, Check, CornerDownLeft, Sparkles, MessageCircle } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const currentQuestion = QUESTIONS[currentStep];

  const validateCurrentStep = useCallback((overrideValue?: string) => {
    const valueToCheck = overrideValue !== undefined ? overrideValue : answers[currentQuestion.id];
    if (currentQuestion.required && !valueToCheck) {
      setError(`${UI_STRINGS.en.error_required} / ${UI_STRINGS.hi.error_required}`);
      return false;
    }
    return true;
  }, [currentQuestion, answers]);

  const handleNext = useCallback(async (eOrOverride?: React.MouseEvent | string) => {
    if (isAnimating || isSubmitting) return;
    
    const overrideValue = typeof eOrOverride === 'string' ? eOrOverride : undefined;
    if (!validateCurrentStep(overrideValue)) return;

    if (currentStep === QUESTIONS.length - 1) {
      setIsSubmitting(true);
      try {
        const res = await fetch('/api/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(answers),
        });

        if (!res.ok) throw new Error('Submission failed');

        setIsAnimating(true);
        setTimeout(() => {
          setIsCompleted(true);
          setIsAnimating(false);
          setIsSubmitting(false);
          setError('');
        }, 400);
      } catch (err) {
        console.error(err);
        setError('An error occurred. Please try again.');
        setIsSubmitting(false);
      }
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
        setError('');
      }, 400);
    }
  }, [isAnimating, isSubmitting, validateCurrentStep, currentStep, answers]);

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
  }, [currentQuestion, handleNext]);

  const handleInputChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    setError('');
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
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 selection:bg-primary/30">
        <div className="animate-[fade-in-up_0.6s_ease-out] text-center max-w-2xl">
          <div className="bg-primary/10 text-primary p-4 rounded-full inline-block mb-8">
            <Sparkles size={48} className="animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4 text-foreground">
            {UI_STRINGS.en.all_set}
          </h1>
          <h2 className="text-2xl md:text-4xl font-medium text-muted-foreground mb-8">
            {UI_STRINGS.hi.all_set}
          </h2>
          <div className="text-xl text-muted-foreground mb-12 font-medium space-y-4">
            <p>{parseString(UI_STRINGS.en.thanks, 'en')}</p>
            <p className="text-muted-foreground/80 text-lg">{parseString(UI_STRINGS.hi.thanks, 'hi')}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-3 mx-auto shadow-lg"
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
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={currentQuestion.type}
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholderCombo}
            className="w-full bg-transparent border-b border-border/80 focus:border-primary outline-none text-2xl md:text-4xl py-4 placeholder:text-muted-foreground/50 text-foreground transition-colors duration-300 font-medium"
          />
        );
      case 'textarea':
        return (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholderCombo}
            rows={3}
            className="w-full bg-transparent border-b border-border/80 focus:border-primary outline-none text-xl md:text-3xl py-4 placeholder:text-muted-foreground/50 text-foreground transition-colors duration-300 resize-none font-medium"
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
                    setTimeout(() => handleNext(option.value), 300); // Auto-advance on choice with value override
                  }}
                  className={`group flex items-center justify-between w-full p-5 rounded-2xl border text-left transition-all duration-200 ${
                    isSelected 
                      ? 'bg-primary/10 border-primary text-foreground' 
                      : 'bg-secondary border-border/50 text-muted-foreground hover:bg-secondary/80 hover:border-border hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-background border border-border/50 text-muted-foreground group-hover:border-border'
                    }`}>
                      {shortcut}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl md:text-2xl font-semibold">{option.label.en}</span>
                      <span className="text-sm md:text-base text-muted-foreground mt-1">{option.label.hi}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="text-primary" size={24} />}
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
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 overflow-hidden relative">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/50 blur-[120px] rounded-full pointer-events-none" />

      {/* Progress Bar */}
      <div className="w-full h-1 bg-secondary fixed top-0 left-0 z-50">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="p-6 md:p-10 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <MessageCircle className="text-primary" size={24} />
          <div className="flex flex-col">
            <span className="text-muted-foreground font-semibold tracking-wider text-xs uppercase">{UI_STRINGS.en.form_title}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto px-4 md:px-12 py-6 md:py-10 z-10">
        
        {/* Animated Question Container */}
        <div 
          className={`transition-all duration-500 ease-in-out ${
            isAnimating 
              ? 'opacity-0 -translate-y-8 scale-95' 
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          {/* Question Number */}
          <div className="flex items-center gap-3 text-primary font-semibold mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-sm">
              {currentStep + 1}
            </span>
            <span className="text-sm tracking-widest uppercase">
              <ArrowRight size={14} className="inline mr-2 opacity-50" />
            </span>
          </div>

          {/* Question Prompts (Bilingual) */}
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 leading-[1.2]">
              {parseString(currentQuestion.prompt.en, 'en')}
            </h2>
            <h3 className="text-lg sm:text-xl md:text-3xl font-medium tracking-tight text-muted-foreground leading-[1.3]">
              {parseString(currentQuestion.prompt.hi, 'hi')}
            </h3>
          </div>

          {/* Input Area */}
          <div className="relative">
            {renderInput()}
            
            {/* Error Message */}
            <div className={`absolute -bottom-8 left-0 text-destructive font-medium text-sm flex items-center transition-opacity duration-300 ${error ? 'opacity-100' : 'opacity-0'}`}>
              {error}
            </div>
          </div>

          {/* Action Buttons (OK / Enter) */}
          <div className="mt-12 flex items-center gap-4">
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="group flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <span className="flex items-center gap-2">
                {currentStep === QUESTIONS.length - 1 
                  ? (isSubmitting ? '...' : UI_STRINGS.en.submit) 
                  : UI_STRINGS.en.ok}
                <span className="opacity-40">|</span>
                {currentStep === QUESTIONS.length - 1 
                  ? (isSubmitting ? '...' : UI_STRINGS.hi.submit) 
                  : UI_STRINGS.hi.ok}
              </span>
              <Check size={18} className="opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>

            {currentQuestion.type !== 'choice' && currentQuestion.type !== 'textarea' && (
              <div className="hidden md:flex items-center gap-2 text-muted-foreground font-medium text-sm">
                <span>{UI_STRINGS.en.press}</span>
                <span className="font-bold text-foreground flex items-center gap-1 bg-secondary px-2 py-1 rounded-md border border-border/50">
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
            className="p-3 rounded-full bg-secondary border border-border/50 text-foreground hover:bg-border/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
            aria-label="Previous question"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={handleNext}
            disabled={isAnimating}
            className="p-3 rounded-full bg-secondary border border-border/50 text-foreground hover:bg-border/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
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
