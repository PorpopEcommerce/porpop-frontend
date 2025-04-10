import { useState, useEffect } from "react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector("header");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > navbarHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbarHeight]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-5 right-5 bg-green-500 text-white h-8 w-8 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-50"
          aria-label="Scroll to top"
        >
          ▲
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
