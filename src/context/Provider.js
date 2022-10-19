import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  const [getPlanets, setPlanets] = useState([]);

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const resultsFiltred = results.filter((itens) => (delete (itens.residents)));
      setPlanets(resultsFiltred);
    };
    requestAPI();
  }, []);

  const contextValue = useMemo(() => ({ getPlanets }), [getPlanets]);

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
