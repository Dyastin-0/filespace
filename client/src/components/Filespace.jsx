import { Link } from "react-router-dom";

const Filespace = () => {
  return (
    <Link
      className="outline-none ml-1 rounded-md p-2
		transition-all durantion-300 focus:shadow-[var(--accent-secondary)_0_0_0_2px]"
      to="/"
    >
      <div className="flex justify-center items-center h-full font-semibold">
        <h1 className="text-sm text-primary-highlight">File</h1>
        <h1 className="text-sm text-primary-foreground">space</h1>
      </div>
    </Link>
  );
};

export default Filespace;
