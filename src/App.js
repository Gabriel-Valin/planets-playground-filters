import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [filtros, setFiltros] = useState({
    coluna: 'population',
    condicao: '>',
    valor: 0,
  });

  const [filtrosSelecionados, setFiltrosSelecionados] = useState([])

  const fetchApi = async () => {
    const response = await fetch('https://swapi.dev/api/planets')
    const dados = await response.json()
    setData(dados.results)
  }

  const tratarDados = (linha) => {
    const planetasFiltrados = [];
    filtrosSelecionados.forEach((filter) => {
      switch (filter.condicao) {
        case '>':
          planetasFiltrados.push(Number(linha[filter.coluna]) >= Number(filter.valor));
          break;
        case '<':
          planetasFiltrados.push(Number(linha[filter.coluna]) <= Number(filter.valor));
          break;
        case '=':
          planetasFiltrados.push(linha[filter.coluna] === filter.valor.toUpperCase());
          break;
        default:
          return true;
      }
    });

    return planetasFiltrados.every((el) => el);
  };

  useEffect(() => {
    fetchApi()
  }, [])

  
  return (
    <div>
      <input type='text' name='planet-name' />
      <select name="coluna" value={filtros.coluna}
          onChange={(e) => setFiltros({ ...filtros, coluna: e.target.value })}>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
      </select>
      <select name="condicao" value={filtros.condicao}
          onChange={(e) => setFiltros({ ...filtros, condicao: e.target.value })}>
        <option value=">">MAIOR DO QUE</option>
        <option value="<">MENOR DO QUE </option>
        <option value="=">IGUAL </option>
      </select>
      <input type='number' name='valor' value={filtros.valor}
          onChange={(e) => setFiltros({ ...filtros, valor: e.target.value })}/>
      <button onClick={() => {
              setFiltrosSelecionados([...filtrosSelecionados, filtros]);
              setFiltros({
                coluna: 'population',
                condicao: '>',
                valor: 0,
              });
            }}>Filtrar</button>
      <button onClick={() => {
        setFiltrosSelecionados([])
      }}>Limpar filtros</button>

      {filtrosSelecionados.map((filtro, index) => (
        <div className="filtrosSelecionados" key={index}>
          <span>
            {filtro.coluna} {filtro.condicao} {filtro.valor}
          </span>
          <button
            onClick={() => {
              const cloneArray = [...filtrosSelecionados];
              cloneArray.splice(index, 1);
              setFiltrosSelecionados(cloneArray);
            }}
          >
            𝙭
          </button>
        </div>
      ))}

       <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Diameter</th>
            <th>Orbital Period</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {data.filter(tratarDados).map((planet, index) => (
            <tr key={index}>
              <td>{planet.name}</td>
              <td>{planet.diameter}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default App;
