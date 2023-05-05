function hashString(str: string) {
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    var character = str.charCodeAt(i);
    hash = ((hash << 5) + hash) ^ character;
  }
  return hash;
}

const Colors = [
  "primary",
  "secondary",
  "accent",
  "info",
  "success",
  "warning",
  "error",
] as const;

export const getColorForString = (str: string) => {
  const hashed = hashString(str);
  return Colors[Math.abs(hashed) % Colors.length];
};
