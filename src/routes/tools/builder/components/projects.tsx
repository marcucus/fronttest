/* This example requires Tailwind CSS v2.0+ */
import { ArrowRightIcon } from "@heroicons/react/solid";
import { Link } from "@reach/router";

const websites = [
  {
    id: "1",
    name: "Sudoku Academy",
    url: "https://www.sudoku.academy",
  },
  {
    id: "2",
    name: "Temple du Haïku",
    url: "https://www.temple-du-haiku.fr",
  },
];

export default function Projects() {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {websites.map((website) => (
        <li
          key={website.url}
          className="col-span-1 bg-white rounded-lg border shadow-lg overflow-hidden"
        >
          <div className="w-full flex items-center justify-between p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 text-lg font-medium truncate">
                  {website.name}
                </h3>
              </div>
              <a
                target={"_blank"}
                href={website.url}
                rel="noopener noreferrer"
                className="mt-1 text-blue-500 text truncate"
              >
                {website.url}
              </a>
            </div>
          </div>
          <div>
            <div className="px-6 py-2 flex items-center">
              <Link
                to={`/tools/builder/${website.id}`}
                className="flex items-center ml-auto space-x-1"
              >
                <span>Accéder au site</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </li>
      ))}
      <Link
        to="/tools/builder/new/"
        type="button"
        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
          />
        </svg>
        <span className="mt-2 block text-sm font-medium text-gray-900">
          Créer un nouveau site
        </span>
      </Link>
    </ul>
  );
}
