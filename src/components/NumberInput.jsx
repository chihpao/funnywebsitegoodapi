import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function NumberInput({ min, max, value, onChange }) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.innerText, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    } else if (e.target.innerText === '' || newValue === 0) {
      // 如果輸入為空或0，不更新數值
      e.target.innerText = '';
    } else {
      // 恢復原值
      e.target.innerText = value;
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrement}
        className="px-2 py-1 bg-gray-300 text-gray-700 rounded-l-md hover:bg-gray-400 transition-colors"
        disabled={value <= min}
      >
        <i className="fas fa-chevron-down"></i>
      </button>
      <div
        className="mx-2 p-2 border-t border-b border-gray-300 text-center w-16"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInputChange}
      >
        {value}
      </div>
      <button
        onClick={handleIncrement}
        className="px-2 py-1 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 transition-colors"
        disabled={value >= max}
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </div>
  );
}

export default NumberInput;