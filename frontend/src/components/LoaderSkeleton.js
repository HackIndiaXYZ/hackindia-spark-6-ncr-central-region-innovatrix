import React from "react";

const LoaderSkeleton = ({ cards = 2, lines = 4 }) => {
  return (
    <div className="loader-skeleton" aria-hidden="true">
      <div className="loader-skeleton-title" />
      <div className="loader-skeleton-copy">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`loader-skeleton-line ${index === 0 ? "short" : index === lines - 1 ? "medium" : ""}`}
          />
        ))}
      </div>
      <div className="loader-skeleton-cards">
        {Array.from({ length: cards }).map((_, index) => (
          <div key={index} className="loader-skeleton-card" />
        ))}
      </div>
    </div>
  );
};

export default LoaderSkeleton;
