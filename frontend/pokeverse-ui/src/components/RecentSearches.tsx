import "./recent-searches.css";

const RecentSearches = ({ items, onSelect }: any) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="recent-container">
      <h3>🕘 Recent Searches</h3>

      <div className="recent-list">
        {items.map((p: any) => (
          <div
            key={p.name}
            className="recent-card"
            onClick={() => onSelect(p.name)}
          >
            <img src={p.image} alt={p.name} />
            <span>{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
