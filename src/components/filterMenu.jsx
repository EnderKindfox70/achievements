const FilterMenu = ({ isOpen, onSort, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="filter-menu">
      <div className="filter-menu-content">
        <button onClick={() => onSort('name')}>Trier par nom</button>
        <button onClick={() => onSort('playtime')}>Trier par temps de jeu</button>
        <button onClick={() => onSort('recent')}>Trier par date</button>
        <button onClick={() => onSort('success')}>Trier par completion</button>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default FilterMenu;