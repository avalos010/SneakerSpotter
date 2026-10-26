import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Sneaker } from "../../types/sneaker";
import Card from "../Card/Card";
import "./sneakergrid.css";

export default function SneakerGrid({ sneakers, loadPrices = false }: { sneakers: Sneaker[]; loadPrices?: boolean }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null);
  const focusIndex = useRef<number | null>(null);
  const [columns, setColumns] = useState(1);
  const [visibleCount, setVisibleCount] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const updateColumns = () => {
      const gap = Number.parseFloat(getComputedStyle(grid).columnGap) || 0;
      const nextColumns = Math.max(1, Math.floor((grid.clientWidth + gap) / (280 + gap)));
      setColumns(nextColumns);
      setVisibleCount((count) => Math.max(count, nextColumns));
    };
    updateColumns();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateColumns);
      return () => window.removeEventListener("resize", updateColumns);
    }
    const observer = new ResizeObserver(updateColumns);
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (focusIndex.current === null || visibleCount <= focusIndex.current) return;
    const cards = gridRef.current?.querySelectorAll<HTMLElement>("[role='listitem']");
    cards?.[focusIndex.current]?.focus();
    focusIndex.current = null;
  }, [visibleCount]);

  useEffect(() => {
    const button = moreRef.current;
    if (!button || visibleCount >= sneakers.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && document.activeElement !== button) {
        setVisibleCount((count) => Math.min(count + columns, sneakers.length));
      }
    }, { rootMargin: "200px 0px" });
    observer.observe(button);
    return () => observer.disconnect();
  }, [columns, sneakers.length, visibleCount]);

  return (
    <>
      <div className="sneaker-container" ref={gridRef} role="list" aria-label="Sneakers">
        {sneakers.slice(0, visibleCount).map((item) => <Card key={item._id} sneaker={item} loadPrices={loadPrices} />)}
      </div>
      {visibleCount < sneakers.length && (
        <div className="catalog-more">
          <button ref={moreRef} type="button" data-cy="load-more" onClick={(event) => {
            const nextCount = Math.min(visibleCount + columns, sneakers.length);
            if (event.detail === 0) focusIndex.current = visibleCount;
            setVisibleCount(nextCount);
            setAnnouncement(`Showing ${nextCount} of ${sneakers.length} sneakers.`);
          }}>Load more sneakers <span aria-hidden="true">↓</span></button>
        </div>
      )}
      <span className="sneaker-grid--announcement" role="status" aria-atomic="true">{announcement}</span>
    </>
  );
}
