import React, { useContext } from 'react';
import MyContext from '../context/myContext';
import Input from './Input';
import Select from './Select';

const OPTIONCOLUNN = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const OPTIONOPERADOR = ['maior que', 'menor que', 'igual a'];

export default function Filter() {
  const {
    nameFilter,
    handleNameFilter,
    colunnFilter,
    handlerColunn,
    comparisonFilter,
    handlerComparison,
    numberFilter,
    handleNumberFilter,
    handleClickFilter,
  } = useContext(MyContext);

  return (
    <>
      <div>
        <Input
          name={ nameFilter }
          label="Busca: "
          type="text"
          value={ nameFilter }
          onChange={ handleNameFilter }
          datatest="name-filter"
        />
      </div>
      <div>
        <Select
          label="Coluna: "
          name={ colunnFilter }
          onChange={ handlerColunn }
          value={ colunnFilter }
          defaultOption
          options={ OPTIONCOLUNN }
          datatest="column-filter"
        />

        <Select
          label="Operador: "
          name={ comparisonFilter }
          onChange={ handlerComparison }
          value={ comparisonFilter }
          defaultOption
          options={ OPTIONOPERADOR }
          datatest="comparison-filter"
        />
        <Input
          name={ numberFilter }
          label="Number: "
          type="number"
          value={ numberFilter }
          onChange={ handleNumberFilter }
          datatest="value-filter"
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClickFilter }
        >
          Filtrar

        </button>
      </div>
    </>
  );
}
