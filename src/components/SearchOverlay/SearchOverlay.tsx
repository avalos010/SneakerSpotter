import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./searchoverlay.css";
import { useEffect, useRef } from "react";
import type { SubmitEvent } from "react";

interface SearchOverlayProps {
  closeOverlay: () => void;
}

function SearchOverlay({ closeOverlay }: SearchOverlayProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim();
    if (!query) return;

    navigate(`/sneakers/${encodeURIComponent(query)}`);
    e.currentTarget.reset();
    closeOverlay();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="search-overlay--container"
      onKeyDown={(e) => e.key === "Escape" && closeOverlay()}
    >
      <div className="search-overlay--content">
        <XMarkIcon className="close-icon" onClick={closeOverlay} />
        <form onSubmit={handleSearch}>
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
    </div>
  );
}
export default SearchOverlay;
