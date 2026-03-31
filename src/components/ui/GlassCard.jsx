import React from 'react';

const GlassCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'normal',
  hover = true 
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'glass',
    light: 'glass-light',
    dark: 'glass-dark',
    solid: 'bg-white border border-gray-200 shadow-lg'
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    normal: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const hoverEffects = hover ? 'hover:transform hover:scale-105 hover:shadow-2xl' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverEffects} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default GlassCard;
