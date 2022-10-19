import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  const [getPlanets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const resultsFiltred = results.filter((itens) => (delete (itens.residents)));
      setPlanets(resultsFiltred);
    };
    requestAPI();
  }, []);

  const handleNameFilter = ({ target }) => {
    setNameFilter(target.value);
  };

  const contextValue = useMemo(() => (
    { getPlanets, handleNameFilter, nameFilter }
  ), [getPlanets, nameFilter]);

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
