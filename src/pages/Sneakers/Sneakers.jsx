import { useParams } from "react-router-dom";
import useSearchSneakers from "../../hooks/useSearchSneakers";

function Sneakers() {
  const { brand } = useParams();
  const { data, isLoading } = useSearchSneakers(brand);

  return (
    <div className="sneakers-container">
      <h2>{brand}</h2>
    </div>
  );
}

export default Sneakers;
