import { useState } from "react";
import "./project-filter.styles.css";
const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

export default function ProjectFilter({ currentFilter, changeFilter }) {
  return (
    <div className="project-filter">
      <nav>
        <p>Filtered by: </p>
        {filterList.map((filter) => (
          <button
            key={filter}
            className={filter === currentFilter ? "active" : ""}
            onClick={() => changeFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
}
