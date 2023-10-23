export const Gradients = [
  "linear-gradient(43deg, #C850C0 0%, #FFCC70 100%)",
  "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
  "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
  "linear-gradient(45deg, #D9AFD9 0%, #97D9E1 100%)",
  "linear-gradient(135deg, #00DBDE 0%, #FC00FF 100%)",
  "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
  "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
  "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
  "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)",
];

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
