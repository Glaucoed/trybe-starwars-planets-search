import React from 'react';
import PropTypes from 'prop-types';

function Input({ name, label, type, value, onChange, datatest }) {
  return (
    <label className="label" htmlFor={ name }>
      { label }
      <div className="control">
        <input
          className="input"
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
          id={ name }
          data-testid={ datatest }
        />
      </div>
    </label>
  );
}

Input.propTypes = {
  datatest: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};

Input.defaultProps = {
  datatest: '',
  label: '',
  value: '',
  name: '',
  onChange: null,
};

export default Input;
