import React from "react";
import { Star } from "lucide-react";

// Five stars filled to the rating, e.g. 4.6 → four full stars and one 60% star
const RatingStars = ({ value, size = 16, color = "#fb7f26" }) => (
  <span className="flex gap-0.5" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((n) => {
      const fill = Math.max(0, Math.min(1, value - n));
      return (
        <span key={n} className="relative inline-block" style={{ width: size, height: size }}>
          <Star size={size} className="absolute inset-0 fill-hi-mist/60 text-hi-mist/60" />
          <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
            <Star size={size} style={{ fill: color, color }} />
          </span>
        </span>
      );
    })}
  </span>
);

export default RatingStars;
