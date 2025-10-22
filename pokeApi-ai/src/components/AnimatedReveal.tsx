import { useEffect, useState, type ReactNode } from "react";

type AnimatedRevealProps = {
  children: ReactNode;
  loading: boolean;
};

export default function AnimatedReveal({
  children,
  loading,
}: AnimatedRevealProps) {
  const [showOverlay, setShowOverlay] = useState(loading);

  useEffect(() => {
    if (loading) {
      setShowOverlay(true);
    } else {
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      {showOverlay && (
        <div id="pokeball-overlay">
          <div className="pokeball-spinner" />
        </div>
      )}
      <div
        style={{
          filter: showOverlay ? "blur(3px)" : "none",
          transition: "filter 0.5s",
        }}
      >
        {children}
      </div>
    </>
  );
}
