
import React, { useState } from 'react';
import { StarIcon } from './Icons';

interface StarRatingInputProps {
  count?: number;
  value: number;
  onChange: (rating: number) => void;
  size?: string; // Tailwind size class e.g. h-8 w-8
  color?: string; // Tailwind text color class e.g. text-yellow-400
  hoverColor?: string; // Tailwind text color class for hover
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({
  count = 5,
  value,
  onChange,
  size = 'h-8 w-8',
  color = 'text-yellow-400',
  hoverColor = 'text-yellow-500',
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const stars = Array(count).fill(0);

  const handleClick = (rating: number) => {
    onChange(rating);
  };

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex items-center space-x-1">
      {stars.map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={ratingValue}
            className={`cursor-pointer transition-colors duration-150 ${
              (hoverRating || value) >= ratingValue ? (hoverRating ? hoverColor : color) : 'text-slate-300'
            } focus:outline-none`}
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => handleMouseEnter(ratingValue)}
            onMouseLeave={handleMouseLeave}
            aria-label={`Rate ${ratingValue} out of ${count} stars`}
          >
            <StarIcon filled={(hoverRating || value) >= ratingValue} className={`${size}`} />
          </button>
        );
      })}
    </div>
  );
};

export default StarRatingInput;