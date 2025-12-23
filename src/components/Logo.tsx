import React from 'react';
import myImage from '../resources/Simplyprefab-logo.png'
import Image from 'next/image'

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconSize?: number;
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  textClassName = 'themed-text font-bold text-xl',
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>

      <span className={textClassName}>
        <Image src={myImage} alt="logo" height={100} width={200} />
      </span>
    </div>
  );
};

export default Logo;