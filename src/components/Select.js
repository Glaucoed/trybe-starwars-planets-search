import React from 'react';
import PropTypes from 'prop-types';

function Select({ label, name, onChange, value, options, datatest }) {
  return (
    <label htmlFor={ name } className="label">
      { label }
      <div className="select">
        <select
          name={ name }
          id={ name }
          required
          onChange={ onChange }
          value={ value }
          data-testid={ datatest }
        >
          {
            options.map((option, index) => (
              <option key={ index }>{ option }</option>
            ))
          }
        </select>
      </div>
    </label>
  );
}

Select.propTypes = {
  datatest: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default Select;
