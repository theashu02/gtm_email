type ProductImageProps = {
  image: string;
};

function ProductImage({ image }: ProductImageProps) {
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

export default ProductImage;
