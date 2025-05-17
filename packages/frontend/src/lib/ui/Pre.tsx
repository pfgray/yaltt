export const Pre = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="prose">
      <pre className="whitespace-pre-wrap break-all">{children}</pre>
    </div>
  );
};
