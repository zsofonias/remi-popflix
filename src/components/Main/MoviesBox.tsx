import { ReactNode, useState } from 'react';
import ExpandBoxToggleButton from './ExpandBoxToggleButton';

interface MoviesBoxProps {
  children: ReactNode;
}

function MoviesBox({ children }: MoviesBoxProps) {
  const [isOpen, setIsOpen] = useState(true);

  function toggleExpandView() {
    setIsOpen((cur) => !cur);
  }

  return (
    <div className="box">
      <ExpandBoxToggleButton onClick={toggleExpandView}>
        {isOpen ? '–' : '+'}
      </ExpandBoxToggleButton>
      {isOpen && children}
    </div>
  );
}

export default MoviesBox;
