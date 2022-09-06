import { useParams } from "react-router-dom";

function Coin() {
    const coinId = useParams();
  return (
    <div>Coin</div>
  )
}

export default Coin