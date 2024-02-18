import { App } from "@yaltt/model";

const Gradients = [
  { angle: 43, start: "#C850C0", end: "#FFCC70" },
  { angle: 160, start: "#0093E9", end: "#80D0C7" },
  { angle: 62, start: "#8EC5FC", end: "#E0C3FC" },
  { angle: 45, start: "#D9AFD9", end: "#97D9E1" },
  { angle: 135, start: "#00DBDE", end: "#FC00FF" },
  { angle: 62, start: "#FBAB7E", end: "#F7CE68" },
  { angle: 45, start: "#85FFBD", end: "#FFFB7D" },
  { angle: 135, start: "#8BC6EC", end: "#9599E2" },
  { angle: 45, start: "#FBDA61", end: "#FF5ACD" },
];

// (g.angle + 270) % 360

function hashString(str: string) {
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    var character = str.charCodeAt(i);
    hash = ((hash << 5) + hash) ^ character;
  }
  return hash;
}

export const getGradientForString = (str: string) => {
  const hashed = hashString(str);
  return Gradients[Math.abs(hashed) % Gradients.length];
};

export const getIconForApp = (app: { name: string }) => {
  const gradient = getGradientForString(app.name);
  const newAngle = (gradient.angle + 270) % 360;
  return `
<svg version="1.1" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <linearGradient id="grad" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(${newAngle}, 50%, 50%)">
    <stop offset="0%" stop-color="${gradient.start}" stop-opacity="1"/>
    <stop offset="100%" stop-color="${gradient.end}" stop-opacity="1"/>
  </linearGradient>
  <g>
    <rect x="0" width="100" height="100" rx="25" fill="url(#grad)"/>
    <text 
      x="50%"
      y="52%"
      text-anchor="middle"
      dy=".3em"
      fill="rgb(31, 41, 55)"
      font-family="Arial, Helvetica, sans-serif"
      font-size="4em"
      font-weight="bold"
    >${app.name[0].toUpperCase()}</text>
  </g>
</svg>

`;
};
