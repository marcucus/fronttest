import React from "react";
import { RouteComponentProps, Link } from "@reach/router";

export const ListSite: React.FC<RouteComponentProps> = (props) => {
  const [showModal, setShowModal] = React.useState(false);
    
  const sites=[
      {
        url:"facebook.com",
        country:"USA",
      },
      {
        url:"sncf.com/fr",
        country:"FR",
      },
      {
        url:"youtube.com",
        country:"USA",
      },
      {
        url:"foudroyer.com",
        country:"FR",
      },
    ];

  const [site, setSite] = React.useState(sites);
  const [url, setUrl] = React.useState('');
  const [country, setCountry] = React.useState('');
  
  function handleChangeUrl(event: { target: { value: React.SetStateAction<string>; }; }) {
    setUrl(event.target.value);
  }
  function handleChangeCountry(event: { target: { value: React.SetStateAction<string>; }; }) {
    setCountry(event.target.value);
  }

  function handleAdd() {
    setShowModal(false);
    const newSite = site.concat({ url, country });
    setSite(newSite);
    setUrl('');
    setCountry('');
  }

  function onRemoveItem(index: number){
      const removeSite = site.filter((sites, url) => index !== url);
      setSite(removeSite);
  };

    function classNames(...classes: string[]) {
      return classes.filter(Boolean).join(' ');
    }

  return(
  <>
      <div className='mb-20'>
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-yellow-500">Dashboard</h1>
          </div>
        </header>
      </div>
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 h-auto w-auto min-h-[420px]">
            <section>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Mes sites</h2>
                  <button onClick={() => setShowModal(true)} type="button" className="hover:bg-yellow-500 group flex items-center rounded-md bg-yellow-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                    <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                      <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                    </svg>
                    Nouveau site
                  </button>
                  {showModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Nouveau Site
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      <div className="relative p-6 flex-auto">
                        <div>
                          <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                              http(s)://
                            </span>
                            <input
                              type="text"
                              name="company-website"
                              id="company-website"
                              value={url}
                              onChange={handleChangeUrl}
                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                              placeholder="www.example.com" />
                          </div>
                          <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="website-country"
                              id="website-country"
                              value={country}
                              onChange={handleChangeCountry}
                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                              placeholder="Pays" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Annuler
                        </button>
                        <button
                          className="text-white bg-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleAdd}
                        >
                          Enregistrer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
                </div><br/>
                <form className="group relative">
                  <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                  </svg>
                  <input className="focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter sites" placeholder="Filtrer sites..." />
                </form>
            </section>
            <div className="-mx-4 mt-5 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      URL
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Localisation
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Outil
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {site.map((sites, index) => (
                    <tr>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm text-yellow-500 hover:text-yellow-600 sm:w-auto sm:max-w-none sm:pl-6">
                          <Link to="/ranking/list/table/" className="font-bold">
                            {sites.url}
                          </Link>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{sites.country}</td>
                      <td className="px-3 py-4 text-sm text-yellow-500 font-bold hover:text-red-500 hover:font-bold">
                        <button
                          value={sites.url}
                          onClick={() => onRemoveItem(index)}
                          className='flex font-bold hover:font-bold'
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 font-bold hover:font-bold" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Supprimer</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
    </>
)
};