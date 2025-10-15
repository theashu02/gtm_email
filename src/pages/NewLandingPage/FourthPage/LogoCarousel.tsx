import { useEffect, useRef, useState } from "react";
import first from "@/assets/carousel/1.png";
import second from "@/assets/carousel/2.png";
import third from "@/assets/carousel/3.png";
import four from "@/assets/carousel/4.png";
import five from "@/assets/carousel/5.png";

export default function LogoCarousel() {
  const logos = [
    {
      src: first,
      alt: "Authbridge - Building trust through data",
    },
    {
      src: second,
      alt: "Quintes Global",
    },
    {
      src: third,
      alt: "Doofy",
    },
    {
      src: four,
      alt: "Samaaro",
    },
    {
      src: five,
      alt: "Samaaro",
    },
  ];

  // Duplicate logos twice for better infinite scrolling effect
  const duplicatedLogos = [...logos, ...logos];

  // State to control animation
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  console.info(containerWidth)

  // Measure container and content widths
  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const updateMeasurements = () => {
        if (containerRef.current && contentRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
          setContentWidth(contentRef.current.offsetWidth / 2);
        }
      };

      updateMeasurements();
      window.addEventListener("resize", updateMeasurements);
      return () => window.removeEventListener("resize", updateMeasurements);
    }
  }, []);

  // Animation effect
  useEffect(() => {
    if (!contentWidth) return;

    let lastTimestamp = 0;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;

      // Adjust speed - lower value = slower scroll
      const pixelsPerSecond = 30;
      const pixelsToMove = (pixelsPerSecond * elapsed) / 1000;

      setScrollPosition((prevPosition) => {
        // Reset position when first set of logos is off screen
        if (Math.abs(prevPosition) >= contentWidth) {
          return 0;
        }
        return prevPosition - pixelsToMove;
      });

      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [contentWidth]);

  return (
    <div className="w-full overflow-hidden bg-white py-6" ref={containerRef}>
      <div
        className="flex"
        style={{
          transform: `translateX(${scrollPosition}px)`,
          transition: scrollPosition === 0 ? "none" : "transform 0.1s linear",
        }}
      >
        <div ref={contentRef} className="flex whitespace-nowrap">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="inline-flex items-center justify-center px-6 md:px-12"
            >
              <div className="flex flex-col items-center w-48">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 sm:h-16 md:h-32 w-auto md:w-48 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}