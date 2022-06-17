/** @jsxImportSource @emotion/react */
// import tw from 'twin.macro';

interface PokemonCardProps {
  image: string;
  stat: string;
  handleClick: () => void;
}

const PokemonCard = ({ image, stat, handleClick }: PokemonCardProps) => {
  const itemClass = stat ? ' active ' + stat : '';
  return (
    <div className={'card' + itemClass} onClick={stat === 'active' ? undefined : handleClick}>
      <img src={image} alt="" />
    </div>
  );
};

export default PokemonCard;
