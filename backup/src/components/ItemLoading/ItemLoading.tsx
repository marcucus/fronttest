export const ItemLoading: React.FC<{ delay: number; dark?: boolean }> = ({
  delay,
  dark,
}) => (
  <div
    className={`w-full rounded-md h-14 animate-pulse ${dark ? "bg-gray-300": "bg-gray-200"}`}
    style={{
      animationDuration: "700ms",
      animationDelay: `${delay}ms`,
    }}
  ></div>
);
