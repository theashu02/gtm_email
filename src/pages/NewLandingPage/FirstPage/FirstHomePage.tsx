import Header from "./Header";
import Hero from "./Hero";

const FirstHomePage = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden font-poppins">
      <div className="relative z-10">
        <Header />
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://res.cloudinary.com/docjed8l4/video/upload/v1750852863/bsfhfhst2wwp5r6ovglu.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <Hero />
      </div>
    </div>
  );
}

export default FirstHomePage;
