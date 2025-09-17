import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';

// PWA install prompt appears when native beforeinstallprompt event fires
// Respects user dismissal for 24 hours, then can appear again
// To reset for immediate testing: localStorage.removeItem('pwa-install-dismissed')
// To force show for testing: window.dispatchEvent(new Event('beforeinstallprompt'))

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [sessionDismissed, setSessionDismissed] = useState(false);


  useEffect(() => {
    console.log('PWA Install Prompt: Component mounted');
    
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    console.log('PWA Install Prompt: isStandalone =', isStandalone, 'isInWebAppiOS =', isInWebAppiOS);
    
    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true);
      console.log('PWA Install Prompt: App already installed');
      return;
    }

    // Check if user has recently dismissed the prompt (within last 24 hours)
    const dismissedTimestamp = localStorage.getItem('pwa-install-dismissed');
    const now = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours
    
    let recentlyDismissed = false;
    if (dismissedTimestamp) {
      const dismissedTime = parseInt(dismissedTimestamp);
      recentlyDismissed = (now - dismissedTime) < oneDayInMs;
    }
    
    console.log('PWA Install Prompt: recentlyDismissed =', recentlyDismissed, 'sessionDismissed =', sessionDismissed);
    
    // Only block if recently dismissed (within 24 hours) or dismissed in current session
    if (recentlyDismissed || sessionDismissed) {
      console.log('PWA Install Prompt: Recently dismissed or session dismissed, not showing');
      return;
    }
    
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('PWA Install Prompt: beforeinstallprompt event fired');
      
      // Double-check dismiss status when event fires
      const currentDismissedTimestamp = localStorage.getItem('pwa-install-dismissed');
      const currentTime = Date.now();
      const oneDayMs = 24 * 60 * 60 * 1000;
      
      let currentlyRecentlyDismissed = false;
      if (currentDismissedTimestamp) {
        const dismissTime = parseInt(currentDismissedTimestamp);
        currentlyRecentlyDismissed = (currentTime - dismissTime) < oneDayMs;
      }
      
      if (currentlyRecentlyDismissed || sessionDismissed) {
        console.log('PWA Install Prompt: User has recently dismissed, ignoring event');
        e.preventDefault();
        return;
      }
      
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);

    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detect browser and OS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isChrome = /Chrome/.test(navigator.userAgent);
    const isEdge = /Edg/.test(navigator.userAgent);
    
    console.log('PWA Install Prompt: Browser detection - iOS:', isIOS, 'Safari:', isSafari, 'Chrome:', isChrome, 'Edge:', isEdge);
    
    // Fallback: Show install prompt after 3 seconds if no native event fires
    // This helps in development or when PWA criteria aren't fully met
    const fallbackTimer = setTimeout(() => {
      if (!deferredPrompt && !showPrompt && !isInstalled && !recentlyDismissed && !sessionDismissed) {
        console.log('PWA Install Prompt: No native event fired, showing fallback prompt');
        setShowPrompt(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(fallbackTimer);
    };
  }, [sessionDismissed]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      console.log('PWA Install Prompt: User clicked install with native prompt');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log('PWA Install Prompt: User choice outcome =', outcome);
      
      if (outcome === 'accepted') {
        setShowPrompt(false);
        setSessionDismissed(true);
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
      } else if (outcome === 'dismissed') {
        setShowPrompt(false);
        setSessionDismissed(true);
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
      }
    } else {
      console.log('PWA Install Prompt: No native prompt available, showing manual instructions');
      // Show manual installation instructions
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isChrome = /Chrome/.test(navigator.userAgent);
      
      let instructions = '';
      if (isIOS) {
        instructions = 'To install this app on iOS: Tap the Share button in Safari, then tap "Add to Home Screen"';
      } else if (isChrome) {
        instructions = 'To install this app: Click the three dots menu in Chrome, then select "Install Heaven of Munroe"';
      } else {
        instructions = 'To install this app: Look for an install option in your browser\'s menu or address bar';
      }
      
      alert(instructions);
      setShowPrompt(false);
      setSessionDismissed(true);
      localStorage.setItem('pwa-install-dismissed', Date.now().toString());
      
      setDeferredPrompt(null);
    } else {
      // For iOS Safari, show instructions
      alert('To install this app on your iOS device, tap the Share button and then "Add to Home Screen".');
      setSessionDismissed(true);
    }
  };

  const handleDismiss = () => {
    console.log('PWA Install Prompt: User dismissed the prompt');
    setShowPrompt(false);
    setSessionDismissed(true);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (isInstalled || !showPrompt) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 relative z-40">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">
              Install Heaven of Munroe App
            </p>
            <p className="text-xs text-blue-100">
              Get faster access and offline features
            </p>

          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleInstallClick}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Install</span>
          </button>
          
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Dismiss install prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}