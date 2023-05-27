import React from "react";
import styles from "./SectionEvents.module.css";
import CardExplorer from "../../components/cardExplorer/CardExplorer";

function SectionEvents({data, title}) {
  
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <div className="d-flex flex-wrap gap-3 justify-content-center pt-3">
        {data.map((category, index) => {
          return (
            <CardExplorer
              key={category.id}
              label={category.name}
              img={category.img}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SectionEvents;
