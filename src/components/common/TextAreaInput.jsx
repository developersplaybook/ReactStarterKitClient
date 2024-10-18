import React from "react";
import PropTypes from 'prop-types';

const TextAreaInput = ({ text, placeholder, onTextChanged, hasError }) => {
  const handleChange = e => {
    onTextChanged(e.target.value);
  };

  return (
    <div style={{ display: 'inline' }}>
      <textarea
        spellCheck="false"
        style={{
          textAlign: "center",
          border: hasError ? '2px solid red' : '1px solid black', // Conditional styling based on error state
          backgroundColor: hasError ? '#ffe6e6' : 'white' // Optional: change background color on error
        }}
        value={text}
        placeholder={placeholder}
        onChange={handleChange}>
      </textarea>
    </div>
  );
};

TextAreaInput.propTypes = {
  text: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onTextChanged: PropTypes.func.isRequired,
  hasError: PropTypes.bool // Prop to indicate if there's an error
};

export default TextAreaInput;