import React from 'react';

export default function PercentageChange({ value }) {
  const isPositive = value >= 0;
  return (
    <span className={`font-medium ${isPositive ? 'text-green-500' : 'text-red-600'}`}>
      {isPositive ? '+' : ''}{value.toFixed(2)}%
    </span>
  );
}