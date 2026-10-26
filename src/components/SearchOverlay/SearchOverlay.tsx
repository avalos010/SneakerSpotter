import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./searchoverlay.css";
import { useEffect, useId, useRef } from "react";
import type { KeyboardEvent, SubmitEvent } from "react";

interface SearchOverlayProps {
  closeOverlay: () => void;
}

function SearchOverlay({ closeOverlay }: SearchOverlayProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
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
    const dialog = dialogRef.current;
    dialog?.showModal();
    inputRef.current?.focus();
    return () => {
      if (dialog?.open) dialog.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  const keepFocusInDialog = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled])");
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
    <dialog
      ref={dialogRef}
      className="search-overlay--container"
      aria-labelledby={titleId}
      onKeyDown={keepFocusInDialog}
      onCancel={(event) => { event.preventDefault(); closeOverlay(); }}
    >
      <div className="search-overlay--content">
        <button className="close-icon" type="button" aria-label="Close search" onClick={closeOverlay}><XMarkIcon aria-hidden="true" /></button>
        <span className="search-overlay--eyebrow">FIND YOUR NEXT PAIR</span>
        <h2 id={titleId}>What are you looking for?</h2>
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
    </dialog>
  );
}
export default SearchOverlay;
