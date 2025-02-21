import { useEffect } from "react";
import anime from "animejs";

function BackgroundGradients({ backgroundColors }) {
  useEffect(() => {
    // Animate gradient colors
    anime({
      targets: ["#gradient1 stop", "#gradient2 stop", "#gradient3 stop"],
      stopColor: backgroundColors[1],
      easing: "easeInOutQuad",
      duration: 800,
    });

    anime({
      targets: ["#gradient4 stop", "#gradient5 stop", "#gradient6 stop"],
      stopColor: backgroundColors[0],
      easing: "easeInOutQuad",
      duration: 800,
    });

    // Animate SVG movements
    const svgAnimationConfig = {
      width: ["100%", "90%"],
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
      duration: 4000,
    };

    [1, 2, 3, 4, 5, 6].forEach((num) => {
      anime({
        targets: `#svg${num}`,
        ...svgAnimationConfig,
        delay: num > 3 ? 0 : (num - 1) * 500,
      });
    });
  }, [backgroundColors]);

  return (
    <>
      <svg
        id="svg1"
        style={{
          position: "absolute",
          zIndex: 0,
          bottom: 0,
          right: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="393"
        height="852"
        fill="none"
        viewBox="0 0 393 852"
      >
        <path
          fill="url(#gradient1)"
          fillOpacity=".3"
          d="M189.5 350C52.3 303.2 6 97.167 0 0h399v851.5h-16.5c-8.667-157.833-55.8-454.7-193-501.5Z"
        />
        <defs>
          <radialGradient
            id="gradient1"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="scale(199.5 425.75) rotate(90 0 1)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="gray" />
            <stop offset="1" stopColor="gray" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <svg
        id="svg2"
        style={{
          position: "absolute",
          zIndex: 0,
          bottom: 0,
          right: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="352"
        height="851"
        fill="none"
        viewBox="0 0 352 851"
      >
        <path
          fill="url(#gradient2)"
          fillOpacity=".3"
          d="M173.2 339.639C38.388 286.349 1.966 78.342.607-19L399.153.028l-40.607 850.531-16.481-.787c-1.13-158.067-34.053-456.844-168.865-510.133Z"
        />
        <defs>
          <radialGradient
            id="gradient2"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-20.30348 425.2656 -199.27302 -9.5139 179.576 415.78)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="gray" />
            <stop offset="1" stopColor="gray" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <svg
        id="svg3"
        style={{
          position: "absolute",
          zIndex: 0,
          bottom: 0,
          right: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="304"
        height="848"
        fill="none"
        viewBox="0 0 304 848"
      >
        <path
          fill="url(#gradient3)"
          fillOpacity=".3"
          d="M153.88 327.253C22.07 266.918-3.316 57.278.467-40L397.452.049l-85.467 847.2-16.417-1.657c7.22-157.906-9.878-458.004-141.688-518.339Z"
        />
        <defs>
          <radialGradient
            id="gradient3"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(-42.73344 423.59995 -198.49252 -20.02424 156.226 403.624)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="gray" />
            <stop offset="1" stopColor="gray" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      {/* Bottom */}
      <svg
        id="svg4"
        style={{
          position: "absolute",
          zIndex: 0,
          bottom: 0,
          left: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="291"
        height="803"
        fill="none"
        viewBox="0 0 291 803"
      >
        <path
          fill="url(#gradient4)"
          fillOpacity=".3"
          d="M100.952 501.5c137.2 46.8 183.5 252.833 189.5 350h-399V0h16.5c8.667 157.833 55.8 454.7 193 501.5Z"
        />
        <defs>
          <radialGradient
            id="gradient4"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(0 -425.75 199.5 0 90.952 425.75)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="gray" />
            <stop offset="1" stopColor="gray" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <svg
        id="svg5"
        style={{
          position: "absolute",
          zIndex: 0,
          bottom: 0,
          left: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="249"
        height="803"
        fill="none"
        viewBox="0 0 249 803"
      >
        <path
          fill="url(#gradient5)"
          fillOpacity=".3"
          d="M76.252 511.861c134.812 53.29 171.234 261.297 172.593 358.639l-398.546-19.028L-109.094.941l16.481.787c1.13 158.067 34.053 456.844 168.865 510.133Z"
        />
        <defs>
          <radialGradient
            id="gradient5"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(20.30348 -425.2656 199.27302 9.5139 69.876 435.72)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="gray" />
            <stop offset="1" stopColor="gray" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <svg
        id="svg6"
        style={{
          position: "absolute",
          zIndex: 0,
          bottom: 0,
          left: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="202"
        height="799"
        fill="none"
        viewBox="0 0 202 799"
      >
        <path
          fill="url(#gradient6)"
          fillOpacity=".3"
          d="M47.572 520.247c131.81 60.335 157.196 269.975 153.413 367.253L-196 847.451l85.467-847.2 16.417 1.657c-7.22 157.906 9.879 458.004 141.688 518.339Z"
        />
        <defs>
          <radialGradient
            id="gradient6"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(42.73344 -423.59995 198.49252 20.02424 45.226 443.876)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="gray" />
            <stop offset="1" stopColor="gray" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </>
  );
}

export default BackgroundGradients;
