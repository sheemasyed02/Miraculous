import React, { useEffect, useState } from 'react';
import './CursorEffect.css';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotation: number;
  color: string;
}

const CursorEffect: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isMoving, setIsMoving] = useState(false);

  // Pinkish color variations for sparkles
  const sparkleColors = [
    '#ffb8e1',
    '#ffa3d9',
    '#ff8dcf',
    '#ff7ac7',
    '#ff69b4',
    '#f8bbd0',
    '#fff0f6',
    '#ffd4ed'
  ];

  useEffect(() => {
    let timeoutId: number;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setIsMoving(true);
      
      // Clear the timeout if mouse is still moving
      clearTimeout(timeoutId);
      
      // Create new sparkle
      const newSparkle: Sparkle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        scale: Math.random() * 0.8 + 0.4,
        rotation: Math.random() * 360,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)]
      };

      setSparkles(prev => [...prev.slice(-8), newSparkle]); // Keep last 9 sparkles

      // Set timeout to stop sparkle generation when mouse stops
      timeoutId = window.setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    const handleMouseLeave = () => {
      setIsMoving(false);
    };

    // Animate sparkles
    const animateSparkles = () => {
      setSparkles(prev => 
        prev.map(sparkle => ({
          ...sparkle,
          opacity: sparkle.opacity - 0.05,
          scale: sparkle.scale + 0.02,
          rotation: sparkle.rotation + 2,
          y: sparkle.y - 1
        })).filter(sparkle => sparkle.opacity > 0)
      );
      
      animationId = requestAnimationFrame(animateSparkles);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationId = requestAnimationFrame(animateSparkles);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="cursor-effect-container">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.x - 6,
            top: sparkle.y - 6,
            opacity: sparkle.opacity,
            transform: `scale(${sparkle.scale}) rotate(${sparkle.rotation}deg)`,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 12px ${sparkle.color}, 0 0 6px ${sparkle.color}40`
          }}
        />
      ))}
      
      {/* Magical trailing dots */}
      {isMoving && sparkles.length > 0 && (
        <div className="cursor-glow" style={{
          left: sparkles[sparkles.length - 1]?.x - 8,
          top: sparkles[sparkles.length - 1]?.y - 8,
        }} />
      )}
    </div>
  );
};

export default CursorEffect;
