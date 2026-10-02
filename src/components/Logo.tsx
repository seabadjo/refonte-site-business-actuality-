import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  isDark?: boolean;
  className?: string;
  showTvBadge?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  showTvBadge = true,
}) => {
  // Dimension tokens
  const dimensions = {
    sm: { width: 140, height: 42, iconSize: 34, textSize: 'text-sm', badgeSize: 'text-[9px] px-1 py-0.2' },
    md: { width: 195, height: 56, iconSize: 46, textSize: 'text-base', badgeSize: 'text-[10px] px-1.5 py-0.5' },
    lg: { width: 260, height: 74, iconSize: 62, textSize: 'text-xl', badgeSize: 'text-xs px-2 py-0.5' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* BA Sphere & Monogram SVG faithfully inspired by the brand mark */}
      <svg
        width={dimensions.iconSize}
        height={dimensions.iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Globe Meridian and Parallel Arc rings in African Orange */}
        <g opacity="0.95">
          {/* Outer orbital arc */}
          <path
            d="M 52 24 C 68 24, 82 36, 84 54 C 85 64, 80 74, 72 80 C 64 86, 52 88, 41 84"
            stroke="#F15A24"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Inner globe latitude line 1 */}
          <path
            d="M 64 36 C 75 42, 82 52, 82 62 C 82 68, 77 73, 70 75"
            stroke="#F15A24"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Longitude meridian curve */}
          <path
            d="M 66 26 C 74 38, 76 56, 70 74"
            stroke="#F15A24"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Equatorial crossbar */}
          <path
            d="M 62 52 L 84 52"
            stroke="#F15A24"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* 'B' Glyph in deep brand purple */}
        <path
          d="M 15 38 C 15 36 17 34 20 34 L 35 34 C 42 34 46 38 46 44 C 46 48 43 51 39 52 C 44 53 48 57 48 62 C 48 68 43 72 36 72 L 18 72 C 16 72 15 70 15 68 Z M 24 41 L 24 49 L 34 49 C 36 49 38 47 38 45 C 38 43 36 41 34 41 Z M 24 56 L 24 65 L 35 65 C 38 65 40 63 40 60.5 C 40 58 38 56 35 56 Z"
          fill="#3B1E68"
          className="dark:fill-[#E0D7F5]"
        />

        {/* 'A' Glyph in deep brand purple */}
        <path
          d="M 44 72 L 56 34 C 57 33 58 32 60 32 C 62 32 63 33 64 34 L 76 72 L 67 72 L 64 61 L 52 61 L 49 72 Z"
          fill="#3B1E68"
          className="dark:fill-[#E0D7F5]"
        />

        {/* Orange Play Button inside the 'A' representing 'TV' media */}
        <polygon
          points="56,58 56,46 64,52"
          fill="#F15A24"
        />
      </svg>

      {/* Brand Typographic Wordmark */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight text-[#3B1E68] dark:text-white leading-none ${dimensions.textSize}`}>
            Business Actuality
          </span>
          {showTvBadge && (
            <span className={`font-bold tracking-wider uppercase text-white bg-[#F15A24] rounded font-sans ${dimensions.badgeSize}`}>
              TV
            </span>
          )}
        </div>
        {showSubtitle && size !== 'sm' && (
          <span className="text-[10px] uppercase tracking-widest text-stone-500 dark:text-stone-400 font-medium mt-0.5">
            L'Afrique qui gagne
          </span>
        )}
      </div>
    </div>
  );
};
