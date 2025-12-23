'use client'

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { CONFIG } from '@/utils/config';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = CONFIG.WHATSAPP.TEAM_NUMBER || "+9676191370";
  
  const handleWhatsAppChat = () => {
    const message = "Hello! I'm interested in SimplyPrefab's paid services. Can you help me?";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 rounded-2xl shadow-2xl border p-4 w-80"
            style={{
              backgroundColor: 'white',
              borderColor: '#FFD0A0'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#FB921D' }}
                >
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: '#1a1a1a' }}>
                    SimplyPrefab Support
                  </h3>
                  <p className="text-sm" style={{ color: '#FB921D' }}>
                    Online now
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 transition-all"
                style={{ color: '#666' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#FB921D';
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#FFF5E6';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#666';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-4">
              <div className="rounded-lg p-3 mb-2" style={{ backgroundColor: '#FFF5E6' }}>
                <p className="text-sm" style={{ color: '#1a1a1a' }}>
                  Hi! 👋 How can we help you with your prefab construction needs?
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleWhatsAppChat}
              className="w-full text-white transition-all duration-300 font-medium"
              style={{ 
                backgroundColor: '#FB921D',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#E67E0F';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#FB921D';
              }}
            >
              Start Chat on WhatsApp
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-4 shadow-2xl transition-all duration-200 text-white"
        style={{ backgroundColor: '#FB921D' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = '#E67E0F';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = '#FB921D';
        }}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </motion.button>
      
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-16 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg text-sm whitespace-nowrap text-white"
          style={{ backgroundColor: '#FB921D' }}
        >
          Need help? Chat with us!
          <div 
            className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-t-4 border-t-transparent border-b-4 border-b-transparent"
            style={{ borderLeftColor: '#FB921D' }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default WhatsAppWidget;
