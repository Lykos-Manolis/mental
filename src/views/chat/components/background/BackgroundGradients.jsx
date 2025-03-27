import { useEffect } from "react";
import anime from "animejs";

function BackgroundGradients({ backgroundColors }) {
  useEffect(() => {
    anime({
      targets: ["#gradient-1", "#gradient-2", "#gradient-3"],
      fill: backgroundColors[0] ?? "#ff008b",
      easing: "easeInOutQuad",
      duration: 800,
    });

    anime({
      targets: ["#gradient-4", "#gradient-5", "#gradient-6"],
      fill: backgroundColors[1] ?? "#7d0029",
      easing: "easeInOutQuad",
      duration: 800,
    });
  }, [backgroundColors]);

  return (
    <svg
      id="visual"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        objectFit: "cover",
        objectPosition: "bottom",
      }}
      preserveAspectRatio="none"
      viewBox="0 0 450 900"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <rect x="0" y="0" width="100%" height="100%" fill="#000000"></rect>
      <g transform="translate(450, 900)">
        <path
          id="gradient-1"
          d="M-315 0C-310.2 -40.6 -305.3 -81.2 -291 -120.5C-276.7 -159.8 -252.9 -197.8 -220.6 -220.6C-188.3 -243.4 -147.6 -251 -109.4 -264.2C-71.3 -277.4 -35.6 -296.2 0 -315L0 0Z"
          fill="#7d0029"
          opacity="0.2"
        ></path>
        <path
          id="gradient-2"
          d="M-210 0C-206.8 -27.1 -203.6 -54.2 -194 -80.4C-184.5 -106.6 -168.6 -131.9 -147.1 -147.1C-125.6 -162.3 -98.4 -167.4 -73 -176.2C-47.5 -185 -23.8 -197.5 0 -210L0 0Z"
          fill="#d30068"
          opacity="0.4"
        ></path>
        <path
          id="gradient-3"
          d="M-105 0C-103.4 -13.5 -101.8 -27.1 -97 -40.2C-92.2 -53.3 -84.3 -65.9 -73.5 -73.5C-62.8 -81.1 -49.2 -83.7 -36.5 -88.1C-23.8 -92.5 -11.9 -98.7 0 -105L0 0Z"
          fill="#ff008b"
          opacity="1"
        ></path>
      </g>
      <g transform="translate(0, 0)">
        <path
          id="gradient-4"
          d="M315 0C310.3 40.4 305.6 80.8 291 120.5C276.4 160.3 251.9 199.4 217.8 217.8C183.7 236.2 140.1 233.9 102.2 246.7C64.3 259.4 32.1 287.2 0 315L0 0Z"
          fill="#7d0029"
          opacity="0.2"
        ></path>
        <path
          id="gradient-5"
          d="M210 0C206.9 26.9 203.8 53.9 194 80.4C184.3 106.9 167.9 132.9 145.2 145.2C122.5 157.5 93.4 155.9 68.1 164.5C42.9 173 21.4 191.5 0 210L0 0Z"
          fill="#d30068"
          opacity="0.4"
        ></path>
        <path
          id="gradient-6"
          d="M105 0C103.4 13.5 101.9 26.9 97 40.2C92.1 53.4 84 66.5 72.6 72.6C61.2 78.7 46.7 78 34.1 82.2C21.4 86.5 10.7 95.7 0 105L0 0Z"
          fill="#ff008b"
          opacity="1"
        ></path>
      </g>
    </svg>
  );
}

export default BackgroundGradients;
