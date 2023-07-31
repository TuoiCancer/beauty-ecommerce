import React from 'react';

interface IBaseButtonProps {
  label: string,
  className?: string,
  onClick: any,
  type?: any
}

const BaseButton: React.FunctionComponent<IBaseButtonProps> = ({
  label,
  className,
  onClick,
  type,
}) => {
  return (
    <button
      className={`${className}`}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default BaseButton;