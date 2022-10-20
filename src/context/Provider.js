import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  const [getPlanets, setPlanets] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [colunnFilter, setColunnFilter] = useState('population');
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
  const handleClickFilter = () => {
    SetFilterAdd([...filterAdd, { colunnFilter, comparisonFilter, numberFilter }]);
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
    setFiltrados(newFiltrado);
  };

  const contextValue = useMemo(() => (
    {
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
