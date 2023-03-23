import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./searchoverlay.css";

function SearchOverlay({ closeOverlay }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/sneakers/${e.target[0].value}`);
    e.target[0].value = "";
    closeOverlay();
  };

  return (
    <div
      className="search-overlay--container"
      onKeyDown={(e) => e.key === "Escape" && closeOverlay()}
    >
      <div className="search-overlay--content">
        <XMarkIcon className="close-icon" onClick={closeOverlay} />
        <form onSubmit={handleSearch}>
          <input className="search-input" type="text" placeholder="Search" />
        </form>
      </div>
    </div>
  );
}
export default SearchOverlay;
