import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./searchoverlay.css";
import { useEffect, useRef } from "react";
import type { KeyboardEvent, SubmitEvent } from "react";

interface SearchOverlayProps {
  closeOverlay: () => void;
}

function SearchOverlay({ closeOverlay }: SearchOverlayProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim();
    if (!query) return;

    navigate(`/sneakers/${encodeURIComponent(query)}`);
    e.currentTarget.reset();
    closeOverlay();
  };

  useEffect(() => {
    const previousFocus = document.activeElement;
    inputRef.current?.focus();
    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") closeOverlay();
    if (event.key !== "Tab") return;
    const controls = dialogRef.current?.querySelectorAll<HTMLElement>("button, input");
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <div
      className="search-overlay--container"
      onKeyDown={handleKeyDown}
    >
      <div ref={dialogRef} className="search-overlay--content" role="dialog" aria-modal="true" aria-labelledby="search-title">
        <button className="close-icon" type="button" aria-label="Close search" onClick={closeOverlay}><XMarkIcon aria-hidden="true" /></button>
        <span className="search-overlay--eyebrow">FIND YOUR NEXT PAIR</span>
        <h2 id="search-title">What are you looking for?</h2>
        <form onSubmit={handleSearch}>
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Try a brand, model, or style ID"
            aria-label="Search sneakers"
          />
          <button type="submit" className="btn">Search <span aria-hidden="true">↗</span></button>
        </form>
      </div>
    </div>
  );
}
export default SearchOverlay;
