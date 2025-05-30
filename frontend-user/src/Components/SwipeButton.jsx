import React, { useState, useRef } from "react";
import styles from "../Styles/ComponentStyles/Sswipebutton.module.css"
import { FaArrowRight } from "react-icons/fa";

function SwipeButton({ onSuccess }) {
  const [isSwiped, setIsSwiped] = useState(false);
  const handleRef = useRef(null);
  const containerRef = useRef(null);

  const moveHandle = (clientX) => {
    if (!handleRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const handle = handleRef.current;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;

    const maxX = container.offsetWidth - handle.offsetWidth;
    const finalX = Math.min(Math.max(0, x), maxX);

    handle.style.left = `${finalX}px`;

    if (finalX >= maxX && !isSwiped) {
      setIsSwiped(true);
      onSuccess();
      cleanupEvents();
    }
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => moveHandle(e.clientX);
  const onMouseUp = () => {
    if (!isSwiped) resetHandle();
    cleanupEvents();
  };

  const onTouchStart = () => {
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  };

  const onTouchMove = (e) => {
    const touch = e.touches[0];
    moveHandle(touch.clientX);
  };

  const onTouchEnd = () => {
    if (!isSwiped) resetHandle();
    cleanupEvents();
  };

  const resetHandle = () => {
    if (handleRef.current) {
      handleRef.current.style.left = `0px`;
    }
  };

  const cleanupEvents = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  };

  return (
    <div className={styles.swipecontainer} ref={containerRef}>
      <div className={styles.swipetrack}>Swipe to order</div>
      <div
        className={styles.swipehandle}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        ref={handleRef}
      >
        <FaArrowRight color="black" size={30}/>
      </div>
    </div>
  );
}

export default SwipeButton;
