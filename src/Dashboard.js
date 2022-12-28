import { useContext } from 'react';
import PlanetsContext from './PlanetsContext'

export default function Dashboard() {
  const {
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
  } = useContext(PlanetsContext);

  const tratarDados = (linha) => {
    const planetasFiltrados = [];
    filtrosSelecionados.forEach((filter) => {
      switch (filter.condicao) {
      case 'maior que':
        planetasFiltrados.push(Number(linha[filter.coluna]) > Number(filter.valor));
        break;
      case 'menor que':
        planetasFiltrados.push(Number(linha[filter.coluna]) < Number(filter.valor));
        break;
      case 'igual a':
        planetasFiltrados.push(linha[filter.coluna] === filter.valor.toUpperCase());
        break;
      default:
        return true;
      }
    });

    return planetasFiltrados.every((el) => el);
  };

     return (
        <div>
            <input
                type="text"
                data-testid="name-filter"
                name="planet-name"
                value={ nomePlaneta }
                onChange={ (e) => {
                setNomePlaneta(e.target.value);
                } }
            />
            <select
                name="coluna"
                data-testid="column-filter"
                value={ filtros.coluna }
                onChange={ (e) => setFiltros({ ...filtros, coluna: e.target.value }) }
            >
                {opcoes.map((op) => (
                <option value={ op } key={ op }>
                    { op }
                </option>
                ))}
                ;
            </select>
            <select
                name="condicao"
                data-testid="comparison-filter"
                value={ filtros.condicao }
                onChange={ (e) => setFiltros({ ...filtros, condicao: e.target.value }) }
            >
                <option value="maior que">maior que</option>
                <option value="menor que">menor que</option>
                <option value="igual a">igual a</option>
            </select>
            <input
                type="number"
                name="valor"
                data-testid="value-filter"
                value={ filtros.valor }
                onChange={ (e) => setFiltros({ ...filtros, valor: e.target.value }) }
            />
            <button
                type="button"
                data-testid="button-filter"
                onClick={ () => {
                setFiltrosSelecionados([...filtrosSelecionados, filtros]);
                const novasOpcoes = opcoes.filter((op) => op !== filtros.coluna);
                setOpcoes(novasOpcoes);
                setFiltros({
                    coluna: opcoes[1],
                    condicao: 'maior que',
                    valor: 0,
                });
                } }
            >
                Filtrar

            </button>
            <button
                type="button"
                data-testid="button-remove-filters"
                onClick={ () => {
                setFiltrosSelecionados([]);
                } }
            >
                Limpar filtros

            </button>

            <select
                name="coluna"
                data-testid="column-sort"
                onChange={ (e) => setColuna(e.target.value) }
            >
                <option value="population">population</option>
                <option value="orbital_period">orbital_period</option>
                <option value="diameter">diameter</option>
                <option value="rotation_Period">rotation_Period</option>
                <option value="surface_water">surface_water</option>
            </select>
            <input
                type="radio"
                name="sort"
                value="ASC"
                onChange={ (e) => {
                setSort(e.target.value)
                } }
            />
            <label>ASC</label>
            <input
                type="radio"
                name="sort"
                value="DESC"
                onChange={ (e) => {
                setSort(e.target.value)
                } }
            />
            <label>DESC</label>
            <button
                type="button"
                data-testid="button-filter"
                onClick={ () => {
                    const unknownValues = data.filter(planet => planet[coluna] === 'unknown')
                    const normalValues = data.sort((planeta1, planeta2) => {
                        if (sort === 'ASC') {
                            return planeta1[coluna] - planeta2[coluna]
                        } 
                        return planeta1[coluna] + planeta2[coluna]
                    }).filter(planet => planet[coluna] !== 'unknown')

                    unknownValues.forEach(item => {
                        if (sort === 'ASC') {
                           return normalValues.push(item)
                        }

                        return normalValues.unshift(item)
                    })

                    setData(normalValues)
                } }
            >
                ORDENAR

            </button>

            {filtrosSelecionados.map((filtro, index) => (
                <div className="filtrosSelecionados" data-testid="filter" key={ index }>
                <span>
                    {filtro.coluna}
                    {' '}
                    {filtro.condicao}
                    {' '}
                    {filtro.valor}
                </span>
                <button
                    type="button"
                    onClick={ () => {
                    const cloneArray = [...filtrosSelecionados];
                    cloneArray.splice(index, 1);
                    setFiltrosSelecionados(cloneArray);
                    } }
                >
                    𝙭
                </button>
                </div>
            ))}

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Rotation Period</th>
                    <th>Orbital Period</th>
                    <th>Diameter</th>
                    <th>Climate</th>
                    <th>Gravity</th>
                    <th>Terrain</th>
                    <th>Surface Water</th>
                    <th>Population</th>
                    <th>Films</th>
                    <th>Created Water</th>
                    <th>Edited</th>
                    <th> URL </th>
                </tr>
                </thead>
                <tbody>
                {data.filter((planet) => planet.name.includes(nomePlaneta)).filter(tratarDados).map((planet, index) => (
                    <tr key={ index }>
                    <td>{planet.name }</td>
                    <td>{planet.rotation_period }</td>
                    <td>{planet.orbital_period }</td>
                    <td>{planet.diameter }</td>
                    <td>{planet.climate }</td>
                    <td>{planet.gravity }</td>
                    <td>{planet.terrain }</td>
                    <td>{planet.surface_water }</td>
                    <td>{planet.population }</td>
                    <td>{planet.films}</td>
                    <td>{planet.created }</td>
                    <td>{planet.edited }</td>
                    <td>{planet.url }</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}