import { useState } from "react";
import "./search-bar.css";

const SearchBar = ({ onSearch, onSurprise, onSort, onHome }: any) => {
  const [value, setValue] = useState("");
  let debounceTimer: any;

  const handleChange = (e: any) => {
    const val = e.target.value;
    setValue(val);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (val.trim().length > 0) {
        onSearch(val.trim());
      }
    }, 500);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        placeholder="Search Pokémon..."
        value={value}
        onChange={handleChange}
      />

      <button className="home-btn" onClick={onHome}>
        🏠 Home
      </button>

      <button className="surprise-btn" onClick={onSurprise}>
        🎲 Surprise Me
      </button>

      <select className="sort-select" onChange={(e) => onSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="id_asc">ID ↑</option>
        <option value="id_desc">ID ↓</option>
        <option value="name_asc">Name A–Z</option>
        <option value="name_desc">Name Z–A</option>
      </select>
    </div>
  );
};

export default SearchBar;
