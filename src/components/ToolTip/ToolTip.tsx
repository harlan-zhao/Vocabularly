import { useState, ReactNode } from 'react';

const Tooltip = ({
  text,
  children,
}: {
  text?: string;
  children: ReactNode;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  if (!text) {
    return children;
  }

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            width: 'max-content',
            fontSize: '0.8rem',
            transform: 'translate(10%, -100%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '5px',
            borderRadius: '5px',
            zIndex: 9999,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
