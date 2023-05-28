import React from "react";
import ProductCard from "../../components/productCard/ProductCard"
import styles from "./sectionFeatured.module.css"

function SectionFeatured({ data, title }) {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <div className="d-flex flex-wrap gap-3 justify-content-around pt-3">
        {data.map((featured, index) => {
          return (
            <ProductCard
              key={featured.id}
              title={featured.name}
              img={featured.img}
              url={`/explorar/productos/${featured.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SectionFeatured;
