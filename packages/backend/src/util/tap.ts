export const tap =
  <A>(f: (a: A) => unknown) =>
  (a: A) => {
    console.log(f(a));
    return a;
  };
