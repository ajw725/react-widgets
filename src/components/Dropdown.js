import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, handleChange }) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleBodyClick = (event) => {
      if(ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  const renderedOptions = options.map(option => {
    if(option.value === selected.value) {
      return null;
    }

    return (
      <div key={option.value} className="item" onClick={() => handleChange(option) }>
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          className={`ui selection dropdown${isOpen ? ' visible active' : ''}`}
          onClick={() => setOpen(!isOpen)}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu${isOpen ? ' visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;