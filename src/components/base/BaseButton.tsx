"use client";

import { Button } from '@mui/material';
import React from 'react';

interface IBaseButtonProps {
  label: string,
  variant: 'contained' | 'outlined' | 'text',
  className?: string,
  onClick?: any,
  type?: 'button' | 'submit' | 'reset',
  styleSx?: any
}

const BaseButton: React.FunctionComponent<IBaseButtonProps> = ({
  label,
  variant,
  className,
  onClick,
  type,
  styleSx
}) => {
  return (
    <Button
      className={`${className}`} 
      variant={variant} 
      onClick={onClick} 
      type={type}
      sx={styleSx}
    >
      { label }
    </Button>
  );
};

export default BaseButton;