import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthScreen } from "../../../store/slices/userSlice";
const BuyNowButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setAuthScreen("signup"));
    navigate("/auth");
  }
  return (
    <button className="bg-black text-white font-bold px-6 py-2 uppercase text-sm tracking-wider hover:bg-gray-800 transition-colors duration-300"
      onClick={handleClick}>
      BUY NOW
    </button>
  );
};

export default BuyNowButton;
