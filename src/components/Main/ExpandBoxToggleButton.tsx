import { ReactNode } from 'react';

interface ExpandBoxToggleButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

function ExpandBoxToggleButton({
  children,
  onClick,
}: ExpandBoxToggleButtonProps) {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {children}
    </button>
  );
}

export default ExpandBoxToggleButton;
