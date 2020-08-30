import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';

const items = [
  { title: 'What is React?', content: 'React is a front-end JavaScript framework' },
  { title: 'Why use React?', content: 'React is a favorite JS library among engineers' },
  { title: 'How do you use React?', content: 'You use React by creating components' }
];

const dropdownOptions = [
  { label: 'The Color Red', value: 'red' },
  { label: 'The Color Green', value: 'green' },
  { label: 'A Shade of Blue', value: 'blue' }
];

const App = () => {
  const [selected, setSelected] = useState(dropdownOptions[0]);
  const [dropdownVisible, setDropdownVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setDropdownVisible(!dropdownVisible)}>Toggle Dropdown</button>
      { dropdownVisible ?
        <Dropdown
          label="Select a Color"
          options={dropdownOptions}
          selected={selected}
          handleChange={setSelected}
        /> : null
      }
    </div>
  );
};

export default App;