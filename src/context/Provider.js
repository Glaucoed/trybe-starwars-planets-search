import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  const [getPlanets, setPlanets] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [colunnFilter, setColunnFilter] = useState('population');
  const [OPTIONCOLUNN, setOPTIONCOLUNN] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);
  const [filterAdd, SetFilterAdd] = useState([]);

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const resultsFiltred = results.filter((itens) => (delete (itens.residents)));
      setPlanets(resultsFiltred);
      setFiltrados(resultsFiltred);
    };
    requestAPI();
  }, []);

  const handleNameFilter = ({ target }) => {
    setNameFilter(target.value);
  };
  const handlerColunn = ({ target }) => {
    setColunnFilter(target.value);
  };

  const handlerComparison = ({ target }) => {
    setComparisonFilter(target.value);
  };

  const handleNumberFilter = ({ target }) => {
    setNumberFilter(target.value);
  };

  const makeTheFilter = useCallback(() => {
    const newFiltrado = filtrados.filter((planet) => {
      switch (comparisonFilter) {
      case 'maior que':
        return +planet[colunnFilter] > +numberFilter;

      case 'menor que':
        return +planet[colunnFilter] < +numberFilter;

      case 'igual a':
        return +planet[colunnFilter] === +numberFilter;

      default:
        return null;
      }
    });
    return newFiltrado;
  }, [colunnFilter, comparisonFilter, filtrados, numberFilter]);

  const handleClickFilter = useCallback(() => {
    SetFilterAdd([...filterAdd, { colunnFilter, comparisonFilter, numberFilter }]);

    const newFiltrado = makeTheFilter();
    setFiltrados(newFiltrado);

    const index = OPTIONCOLUNN.indexOf(colunnFilter);
    OPTIONCOLUNN.splice(index, 1);

    setColunnFilter(OPTIONCOLUNN[0]);
  }, [colunnFilter,
    comparisonFilter,
    OPTIONCOLUNN, filterAdd, makeTheFilter, numberFilter]);

  const handleRemoveOneFilter = useCallback((param) => {
    setOPTIONCOLUNN([...OPTIONCOLUNN, param]);
    const copyGetPlanets = [...getPlanets];
    const copyFilterAdd = [...filterAdd];
    const indexSave = filterAdd.findIndex((filtro) => filtro.colunnFilter === param);
    copyFilterAdd.splice(indexSave, 1);
    SetFilterAdd(copyFilterAdd);

    if (!copyFilterAdd.length) {
      setFiltrados(copyGetPlanets);
    }

    copyFilterAdd.forEach(({
      colunnFilter: colunnF,
      comparisonFilter: comparisonF,
      numberFilter: numberF,
    }) => {
      const removeFilter = copyGetPlanets.filter((planet) => {
        switch (comparisonF) {
        case 'maior que':
          return +planet[colunnF] > +numberF;

        case 'menor que':
          return +planet[colunnF] < +numberF;

        case 'igual a':
          return +planet[colunnF] === +numberF;

        default:
          return null;
        }
      });
      setFiltrados(removeFilter);
    });
  }, [filterAdd, getPlanets, OPTIONCOLUNN]);

  const handleRemoverFilters = useCallback(() => {
    SetFilterAdd([]);
    const number5 = 5;
    OPTIONCOLUNN.splice(
      0,
      number5,
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    );
    setColunnFilter(OPTIONCOLUNN[0]);
    setFiltrados(getPlanets);
  }, [getPlanets, OPTIONCOLUNN]);

  const contextValue = useMemo(() => (
    {
      OPTIONCOLUNN,
      filtrados,
      getPlanets,
      handleNameFilter,
      nameFilter,
      handlerColunn,
      colunnFilter,
      handlerComparison,
      comparisonFilter,
      handleNumberFilter,
      numberFilter,
      handleClickFilter,
      filterAdd,
      handleRemoverFilters,
      handleRemoveOneFilter,
    }
  ), [
    filtrados,
    getPlanets,
    nameFilter,
    colunnFilter,
    comparisonFilter,
    numberFilter,
    filterAdd,
    handleClickFilter,
    handleRemoverFilters,
    handleRemoveOneFilter,
    OPTIONCOLUNN,

  ]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
