import React, { useContext } from 'react';
import MyContext from '../context/myContext';
import Input from './Input';

export default function Filter() {
  const { nameFilter, handleNameFilter } = useContext(MyContext);
  return (
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
  );
}
