export const WaveLine = ({ className = '', color = '#f89100' }) => (
    <svg
      className={`w-full h-32 ${className}`}
      viewBox="0 0 1440 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        fill={color}
        d="M0 30 C 360 90 1080 -30 1440 30 L1440 60 L0 60 Z"
      >
        {/* <animate
          attributeName="d"
          dur="6s"
          repeatCount="indefinite"
          values="
            M0 30 C 360 90 1080 -30 1440 30 L1440 60 L0 60 Z;
            M0 30 C 360 -30 1080 90 1440 30 L1440 60 L0 60 Z;
            M0 30 C 360 90 1080 -30 1440 30 L1440 60 L0 60 Z
          "
        /> */}

      </path>
    </svg>
  );