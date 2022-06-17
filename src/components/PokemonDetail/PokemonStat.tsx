/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

interface PokemonStatProps {
  pokemon: CustomizedPokemon;
  title: string;
}

const PokemonStat = (props: PokemonStatProps) => {
  const { pokemon, title } = props;

  return (
    <div className="pokemon-stats">
      <h2 className="pokemon-heading" css={tw` mb-[20px] `}>
        {title}
      </h2>
      <ul
        css={tw`flex gap-2 justify-center items-center text-[13px] lg:(grid grid-cols-4 justify-center)`}
      >
        {pokemon?.stats?.map((stat) => {
          return (
            <li key={stat.stat.name} className="stat-item" css={tw`bg-[#f6f8fc] `}>
              <p className="stat-name" data-color={stat.stat.name}>
                {stat?.stat.name.substring(0, 3)}
              </p>
              <p className="pokemon-base-stat">{stat.base_stat}</p>
            </li>
          );
        })}
        <li className="stat-item" css={tw` bg-total`}>
          <p className="stat-name" css={tw` bg-total`}>
            TOT
          </p>
          <p className="pokemon-base-stat">
            {pokemon?.stats?.reduce((total, stat) => {
              return total + stat.base_stat;
            }, 0)}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default PokemonStat;
