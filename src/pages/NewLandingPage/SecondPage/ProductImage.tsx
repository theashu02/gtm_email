// import ImageLogo from "../../../assets/AppImage.png"

// function ProductImage() {
//   return (
//     <div
//       className="rounded-xl overflow-hidden p-4 md:py-[90px] flex items-center justify-center"
//       style={{
//         background: "linear-gradient(180deg, #09D2F8 0%, #5735BA 87.5%)",
//       }}
//     >
//       <div className="w-full max-w-xl bg-transparent">
//         <img
//           src={ImageLogo}
//           alt="Competitive Landscape Dashboard"
//           className="w-full rounded"
//         />
//       </div>
//     </div>
//   );
// }

// export default ProductImage;
import PropTypes from "prop-types";

function ProductImage({ image }) {
  return (
    <div
      className="rounded-2xl overflow-hidden p-4 md:py-[60px] flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #09D2F8 0%, #5735BA 87.5%)",
      }}
    >
      <div className="w-full max-w-4xl bg-transparent rounded-xl overflow-hidden mx-12 shadow-2xl shadow-slate-700">
        <img
          src={image}
          alt="Competitive Landscape Dashboard"
          className="w-full md:h-[400px] rounded-xl"
        />
      </div>
    </div>
  );
}

ProductImage.propTypes = {
  image: PropTypes.string.isRequired,
};

export default ProductImage;
