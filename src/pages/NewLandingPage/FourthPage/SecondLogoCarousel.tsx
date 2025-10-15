import { useEffect, useRef, useState } from "react";
import first from "../../../assets/carousel/logo/1.png";
import second from "../../../assets/carousel/logo/2.png";
import third from "../../../assets/carousel/logo/3.png";
import four from "../../../assets/carousel/logo/4.png";
import five from "../../../assets/carousel/logo/5.png";
import six from "../../../assets/carousel/logo/6.png";
import seven from "../../../assets/carousel/logo/7.png";
import eight from "../../../assets/carousel/logo/8.png";
import nine from "../../../assets/carousel/logo/9.png";
import ten from "../../../assets/carousel/logo/10.png";
import eleven from "../../../assets/carousel/logo/11.png";
import twelve from "../../../assets/carousel/logo/12.png";
import thirteen from "../../../assets/carousel/logo/13.png";
import fourteen from "../../../assets/carousel/logo/14.png";
import fifteen from "../../../assets/carousel/logo/15.png";
import sixteen from "../../../assets/carousel/logo/16.png";
import seventeen from "../../../assets/carousel/logo/17.png";
import eighteen from "../../../assets/carousel/logo/18.png";
import ninteen from "../../../assets/carousel/logo/19.png";
import twenty from "../../../assets/carousel/logo/20.png";
import twentyone from "../../../assets/carousel/logo/21.webp";
import twentytwo from "../../../assets/carousel/logo/22.png";

export default function SecondLogoCarousel() {
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
      alt: "four",
    },
    {
      src: five,
      alt: "five",
    },
    {
      src: six,
      alt: "six",
    },
    {
      src: seven,
      alt: "seven",
    },
    {
      src: eight,
      alt: "eight",
    },
    {
      src: nine,
      alt: "nine",
    },
    {
      src: ten,
      alt: "ten",
    },
    {
      src: eleven,
      alt: "eleven",
    },
    {
      src: twelve,
      alt: "twelve",
    },
    {
      src: thirteen,
      alt: "thirteen",
    },
    {
      src: fourteen,
      alt: "fourteen",
    },
    {
      src: fifteen,
      alt: "fifteen",
    },
    {
      src: sixteen,
      alt: "sixteen",
    },
    {
      src: seventeen,
      alt: "seventeen",
    },
    {
      src: eighteen,
      alt: "eighteen",
    },
    {
      src: ninteen,
      alt: "ninteen",
    },
    {
      src: twenty,
      alt: "twenty",
    },
    {
      src: twentyone,
      alt: "twentyone",
    },
    {
      src: twentytwo,
      alt: "twentytwo",
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
  console.info(containerWidth);

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
      const pixelsPerSecond = 40;
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
              className="inline-flex items-center justify-center px-4 md:px-10"
            >
              <div className="flex items-center justify-center w-28 md:w-40">
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