import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';
import data from './mocks/data';

describe('verificando a cobertura da aplicação ', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(data),
    }));

    render(
      <Provider>
        <App />
      </Provider>,
    );
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Verifica se o fetch é realizado', async () => {
    expect(fetch).toBeCalled();
  });

  it('Testa a busca pelo input', () => {
    const inputBusca = screen.getByRole('textbox');
    expect(inputBusca).toBeInTheDocument();
    userEvent.type(inputBusca, 'c');
    const planetName = screen.getByRole('cell', { name: /coruscant/i });
    expect(planetName).toBeInTheDocument();
  });

  it('testando a coluna population|maior que | 2000000000 , adicao e exclusao', () => {
    const coluna = screen.getByRole('combobox', { name: /coluna:/i });
    const operador = screen.getByRole('combobox', { name: /operador:/i });
    const number = screen.getByRole('spinbutton', { name: /number:/i });
    const buttonFiltrar = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(coluna, 'population');
    userEvent.selectOptions(operador, 'maior que');
    userEvent.type(number, '2000000000');
    userEvent.click(buttonFiltrar);

    const descrptionDelete = screen.getByTestId('filter');
    expect(descrptionDelete).toHaveTextContent(/population maior que 02000000000/i);

    const buttonDelete = screen.getByRole('button', { name: /delete/i });
    userEvent.click(buttonDelete);
    expect(buttonDelete).not.toBeInTheDocument();
  });

  it('teste se é igual e limpa todos os filtros', () => {
    const coluna = screen.getByRole('combobox', { name: /coluna:/i });
    const operador = screen.getByRole('combobox', { name: /operador:/i });
    const inputNumber = screen.getByRole('spinbutton', { name: /number:/i });
    const buttonFiltrar = screen.getByRole('button', { name: /filtrar/i });
    userEvent.selectOptions(coluna, 'surface_water');
    userEvent.selectOptions(operador, 'igual a');
    userEvent.type(inputNumber, '1');
    userEvent.click(buttonFiltrar);

    const buttonRemoveAll = screen.getByRole('button', { name: /remover todas filtragens/i });

    userEvent.click(buttonRemoveAll);

    const tatooine = screen.getByRole('cell', { name: /tatooine/i });
    const alderaan = screen.getByRole('cell', { name: /alderaan/i });

    expect(tatooine && alderaan).toBeInTheDocument();
  });

  it('apagar os filtros', async () => {
    const coluna = screen.getByRole('combobox', { name: /coluna:/i });
    const operador = screen.getByRole('combobox', { name: /operador:/i });
    const inputNumber = screen.getByTestId('value-filter');
    const buttonFiltrar = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(coluna, 'population');
    userEvent.selectOptions(operador, 'maior que');
    userEvent.type(inputNumber, '6000000');
    userEvent.click(buttonFiltrar);

    await screen.findByText(/population maior que 06000000/i);

    userEvent.clear(screen.getByTestId('value-filter'));

    userEvent.selectOptions(coluna, 'orbital_period');
    userEvent.selectOptions(operador, 'maior que');
    userEvent.type(inputNumber, '364');
    userEvent.click(buttonFiltrar);

    await screen.findByText(/orbital_period maior que 364/i);

    userEvent.clear(screen.getByTestId('value-filter'));

    userEvent.selectOptions(coluna, 'diameter');
    userEvent.selectOptions(operador, 'menor que');
    userEvent.type(inputNumber, '4901');
    userEvent.click(buttonFiltrar);

    await screen.findByText(/diameter menor que 4901/i);
    const buttonDelete = screen.getAllByRole('button', { name: /delete/i });

    userEvent.click(buttonDelete[2]);
  });

  it('testa o menor que', () => {
    const coluna = screen.getByRole('combobox', { name: /coluna:/i });
    const operador = screen.getByRole('combobox', { name: /operador:/i });
    const inputNumber = screen.getByRole('spinbutton', { name: /number:/i });
    const buttonFiltrar = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(coluna, 'diameter');
    userEvent.selectOptions(operador, 'menor que');
    userEvent.type(inputNumber, '4901');
    userEvent.click(buttonFiltrar);

    const endor = screen.getByRole('cell', { name: /endor/i });

    expect(endor).toBeInTheDocument();
  });
});
