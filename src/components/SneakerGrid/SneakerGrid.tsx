import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Sneaker } from "../../types/sneaker";
import Card from "../Card/Card";

export default function SneakerGrid({ sneakers }: { sneakers: Sneaker[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null);
  const [columns, setColumns] = useState(1);
  const [visibleCount, setVisibleCount] = useState(0);

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

  useEffect(() => {
    const button = moreRef.current;
    if (!button || visibleCount >= sneakers.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setVisibleCount((count) => Math.min(count + columns, sneakers.length));
    }, { rootMargin: "200px 0px" });
    observer.observe(button);
    return () => observer.disconnect();
  }, [columns, sneakers.length, visibleCount]);

  return (
    <>
      <div className="sneaker-container" ref={gridRef}>
        {sneakers.slice(0, visibleCount).map((item) => <Card key={item._id} sneaker={item} />)}
      </div>
      {visibleCount < sneakers.length && (
        <div className="catalog-more">
          <button ref={moreRef} type="button" data-cy="load-more" onClick={() => setVisibleCount((count) => Math.min(count + columns, sneakers.length))}>Load more sneakers <span aria-hidden="true">↓</span></button>
        </div>
      )}
    </>
  );
}
