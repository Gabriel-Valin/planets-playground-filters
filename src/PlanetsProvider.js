import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
    const [data, setData] = useState([]);
    const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
    const [nomePlaneta, setNomePlaneta] = useState('');
    const [opcoes, setOpcoes] = useState([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);

    const [filtros, setFiltros] = useState({
      coluna: 'population',
      condicao: 'maior que',
      valor: 0,
    });

    const [sort, setSort] = useState('ASC');
    const [coluna, setColuna] = useState('population');

    const fetchApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const dados = await response.json();
      setData(dados.results);
    };

  useEffect(() => {
    fetchApi();
  }, []);

  const values = useMemo(() => ({
    data,
    setData,
    coluna,
    setColuna,
    filtrosSelecionados,
    setFiltrosSelecionados,
    nomePlaneta,
    setNomePlaneta,
    opcoes,
    setOpcoes,
    filtros,
    setFiltros,
    sort,
    setSort
  }), [coluna, data, filtros, filtrosSelecionados, nomePlaneta, opcoes, sort]);

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;