import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon} from "@heroicons/react/solid";
import { RouteComponentProps, Link } from "@reach/router";
import { Props } from "@headlessui/react/dist/types";

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
<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <section>
          <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Mes sites</h2>
                <button onClick={() => setShowModal(true)} type="button" className="hover:bg-yellow-500 group flex items-center rounded-md bg-yellow-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                  <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                    <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                  </svg>
                  Nouveau site
                </button>
                </div>
              <form className="group relative">
                  <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                  </svg>
                  <input className="focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter sites" placeholder="Filtrer sites..."/>
              </form>
          </header>
        </section>
  <ul className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">     
    {site.map((sites, index) => (
      <li key={sites.url} className="transform shadow-2xl rounded-lg bg-gray-900">
        <div className="hover:border-yellow-500 hover:border-solid hover:border-2 hover:text-white text-white group w-full flex flex-col items-center justify-center rounded-lg border-2 border-solid border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3">
        <div className="px-4 py-5 sm:px-6 bg">
          <div className="flex space-x-48">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium hover:text-yellow-500">
                <Link to="/ranking/list/table/">
                  {sites.url}
                </Link>
              </p>
              <p className="text-sm text-gray-400">
                <Link to="/ranking/list/table/">
                  {sites.country}
                </Link>
              </p>
            </div>
            <div className="flex-shrink-0 self-center flex">
              <Menu as="div" className="relative z-0 inline-block text-left">
                <div className="ml-auto">
                  <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-yellow-500">
                    <span className="sr-only">Options</span>
                    <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          value={sites.url}
                          onClick={() => onRemoveItem(index)}
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'flex px-4 py-2 text-sm w-full'
                          )}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Supprimer</span>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
        </div>
      </li>
      ))}
      <li className="flex">
        <button onClick={() => setShowModal(true)} className="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3">
          <svg className="group-hover:text-blue-500 mb-1 text-slate-400" width="20" height="20" fill="currentColor" aria-hidden="true">
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
                                placeholder="www.example.com"
                              />
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
                              placeholder="Pays"
                            />
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
        </li>
      </ul>  
      </div>
</>
)
};