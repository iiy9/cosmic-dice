'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [roll, setRoll] = useState<number | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rollHistory, setRollHistory] = useState<Array<{roll: number, source: string}>>([]);

  const handleRoll = async () => {
    setLoading(true);
    const res = await fetch('/api/roll');
    const data = await res.json();
    setRoll(data.roll);
    setSource(data.source);
    
    // Update roll history
    if (data.roll && data.source) {
      setRollHistory(prev => [...prev.slice(-4), { roll: data.roll, source: data.source }]);
    }
    
    setLoading(false);
  };

  // Stars background effect
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number}>>([]);

  useEffect(() => {
    const createStars = () => {
      const newStars = [];
      for (let i = 0; i < 30; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.2
        });
      }
      setStars(newStars);
    };
    
    createStars();
  }, []);

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white relative overflow-hidden">
        {/* Background stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.5, star.opacity],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="z-10 px-4 w-full max-w-md"
        >
          <Card className="p-6 w-full text-center space-y-5 bg-black/70 border border-indigo-500/20 backdrop-blur-sm rounded-xl">
            <motion.h1 
              className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-indigo-500"
            >
              🎲 Cosmic Dice
            </motion.h1>
            
            <p className="text-sm text-zinc-400">
              A fun project using SpaceComputer&apos;s Orbitport for true cosmic randomness.
              Roll dice with entropy harvested from satellites in orbit!
            </p>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                className='cursor-pointer bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-all' 
                onClick={handleRoll} 
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    🌀
                  </motion.div>
                ) : 'ROLL DICE'}
              </Button>
            </motion.div>

            <AnimatePresence mode="wait">
              {roll !== null && (
                <motion.div 
                  key={roll}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <motion.p className="text-3xl">
                    🎯 <span className="font-bold text-gradient bg-gradient-to-r from-yellow-400 to-orange-500">{roll}</span>
                  </motion.p>
                  <p className="text-sm text-blue-400">
                    🔗 Source: {source}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {rollHistory.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-3 border-t border-indigo-500/20"
              >
                <p className="text-xs text-indigo-400 mb-2">Recent rolls:</p>
                <div className="flex justify-center gap-2">
                  {rollHistory.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-7 h-7 rounded-full bg-indigo-700/70 flex items-center justify-center text-xs font-bold"
                    >
                      {item.roll}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Disclaimer footer */}
        <div className="absolute bottom-0 w-full text-center pb-3 text-xs text-zinc-500">
          <p>This is a fun project using SpaceComputer&apos;s services. Not affiliated with SpaceComputer.</p>
          <p>Created by <Link href="https://twitter.com/yixitco" target="_blank" className="hover:text-indigo-400 underline">@yixitco</Link></p>
        </div>
      </main>
    </>
  );
}