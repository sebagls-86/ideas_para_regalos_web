import React from "react";
import SimpleCard from "../../components/simpleCard/SimpleCard";

function SimpleSlideCards({ title }) {
  const dummy = [
    {
      id: 1,
      name: "Electrónica",
      image: "https://random.imagecdn.app/500/500",
    },
    {
        id: 1,
        name: "Belleza",
        image: "https://random.imagecdn.app/500/500",
      },
      {
        id: 1,
        name: "Moda",
        image: "https://random.imagecdn.app/500/500",
      },
      {
        id: 1,
        name: "Mas buscados",
        image: "https://random.imagecdn.app/500/500",
      },
      {
        id: 1,
        name: "Electrónica",
        image: "https://random.imagecdn.app/500/500",
      },
      {
          id: 1,
          name: "Belleza",
          image: "https://random.imagecdn.app/500/500",
        },
        {
          id: 1,
          name: "Moda",
          image: "https://random.imagecdn.app/500/500",
        },
        {
          id: 1,
          name: "Mas buscados",
          image: "https://random.imagecdn.app/500/500",
        }
  ];
  return (
    <div>
      <h2>{title}</h2>
      {dummy.map((card, index) => {
        return (
          <SimpleCard title={card.name} image={card.image}/>
        );
      })}
    </div>
  );
}

export default SimpleSlideCards;
