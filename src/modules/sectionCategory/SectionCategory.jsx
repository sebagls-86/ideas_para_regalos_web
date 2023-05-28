import React from "react";
import styles from "./SectionCategory.module.css";
import CardExplorer from "../../components/cardExplorer/CardExplorer";

function SectionCategory({title, data}) {
    
    return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <div className="d-flex flex-wrap gap-3 justify-content-center pt-3">
        {data.map((data) => {
          return (
            <CardExplorer
              key={data.id}
              label={data.name}
              img={data.img}
              url={`/explorar/${data.name.toLowerCase()}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SectionCategory;
