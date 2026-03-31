import React from 'react';

const GlassCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'normal',
  hover = true 
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300 backdrop-blur-xl';
  
  const variants = {
    default: 'bg-white/80 border border-white/20 shadow-xl',
    light: 'bg-white/60 border border-white/30 shadow-lg',
    dark: 'bg-gray-900/80 border border-gray-700/50 shadow-xl',
    solid: 'bg-white border border-gray-200 shadow-xl'
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    normal: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const hoverEffects = hover ? 'hover:shadow-2xl' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverEffects} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default GlassCard;
