import React, { useContext } from 'react';
import MyContext from '../context/myContext';
import Input from './Input';
import Select from './Select';

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
    filterAdd,
    handleRemoverFilters,
    handleRemoveOneFilter,
    OPTIONCOLUNN,
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
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleRemoverFilters }
        >
          Remover todas filtragens

        </button>
      </div>
      <div>
        {
          filterAdd?.map((filtro) => (
            <div
              key={ ` ${filtro.colunnFilter}` }
              data-testid="filter"
            >
              <p>
                {`${filtro.colunnFilter} 
              ${filtro.comparisonFilter} 
              ${filtro.numberFilter}`}
              </p>
              <button
                type="button"
                onClick={ () => handleRemoveOneFilter(filtro.colunnFilter) }
              >
                delete

              </button>
            </div>
          ))
        }
      </div>
    </>
  );
}
