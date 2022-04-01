const H1: React.FC = ({ children }) => (
  <h2 className="max-w-2xl text-6xl font-bold text-transparent text-gray-900">
    {children}
  </h2>
);

const H2: React.FC = ({ children }) => (
  <h2 className="max-w-2xl text-4xl font-bold text-transparent text-gray-900">
    {children}
  </h2>
);

const H3: React.FC = ({ children }) => (
  <h2 className="max-w-2xl text-3xl font-bold text-transparent text-gray-900">
    {children}
  </h2>
);
const H4: React.FC = ({ children }) => (
  <h2 className="max-w-2xl text-2xl font-bold text-transparent text-gray-900">
    {children}
  </h2>
);

const H5: React.FC = ({ children }) => (
  <h2 className="max-w-2xl text-xl font-bold text-transparent text-gray-900">
    {children}
  </h2>
);

const H6: React.FC = ({ children }) => (
  <h2 className="max-w-2xl text-lg font-bold text-transparent text-gray-900">
    {children}
  </h2>
);

export const Heading: React.FC<{
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}> = ({ children, tag }) => {
  if (tag === "h1") return <H1>{children}</H1>;
  if (tag === "h2") return <H2>{children}</H2>;
  if (tag === "h3") return <H3>{children}</H3>;
  if (tag === "h4") return <H4>{children}</H4>;
  if (tag === "h5") return <H5>{children}</H5>;
  if (tag === "h6") return <H6>{children}</H6>;

  return <>hello</>;
};
