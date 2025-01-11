import { useState } from 'react';

interface TextExpanderProps {
  children: string;
  excerptLength?: number;
  expanded?: boolean;
  expandButtonText?: string;
  collapseButtonText?: string;
  buttonColor?: string;
  buttonInline?: boolean;
  classname?: string;
}

function TextExpander({
  children,
  excerptLength = 10,
  expanded = false,
  expandButtonText = 'Read More',
  collapseButtonText = 'Read Less',
  buttonColor = 'blue',
  buttonInline = true,
  classname = '',
}: TextExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const text = isExpanded
    ? children
    : `${children?.toString().split(' ').slice(0, excerptLength).join(' ')}...`;

  const buttonStyle = {
    background: 'none',
    border: 'none',
    font: 'inherit',
    color: buttonColor,
    cursor: 'pointer',
    display: buttonInline ? 'inline' : 'block',
  };

  return (
    <p className={classname}>
      {text}{' '}
      <button style={buttonStyle} onClick={() => setIsExpanded((cur) => !cur)}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </p>
  );
}

export default TextExpander;
