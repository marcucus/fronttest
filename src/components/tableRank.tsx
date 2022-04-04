import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid";
import { RouteComponentProps } from "@reach/router";
import React, { Fragment } from "react";

export const TableRank: React.FC<RouteComponentProps> = () => {
  const [showModal, setShowModal] = React.useState(false);
  
  const keys = [
    { position:1, keyword: 'haiku amour', tendance: '1', url: 'temple-du-haiku.fr/exemples-de-haiku/amour/' },
    { position:1, keyword: 'haiku célèbre', tendance: '1', url: 'temple-du-haiku.fr/exemples-de-haiku/' },
    { position:1, keyword: 'haiku printemps', tendance: '2->1', url: 'temple-du-haiku.fr/exemples-de-haiku/printemps/' },
    { position:2, keyword: 'google serp', tendance: '1->2', url: 'google.com' },
  ]

  const sites = [
    { id:1, url:"facebook.com", country:"USA" },
    { id:2, url:"sncf.com/fr", country:"FR" },
    { id:3, url:"youtube.com", country:"USA" },
    { id:4, url:"foudroyer.com", country:"FR" },
  ]

  const [selected, setSelected] = React.useState(sites[3])

  const [key, setKey] = React.useState(keys);
  const [keyword, setKeyword] = React.useState('');
  const [url, setUrl] = React.useState('');

  function handleChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    setKeyword(event.target.value);
  }

  function handleChangeUrl(event: { target: { value: React.SetStateAction<string>; }; }) {
    setUrl(event.target.value);
  }

  function handleAdd() {
    setShowModal(false);
    const newKey = key.concat({ keyword, position:2, tendance:'2',url});
    setKey(newKey);
    setKeyword('');
    setUrl('');
  }

  function onRemoveItem(index: number){
    const removeKey = key.filter((keys, url) => index !== url);
    setKey(removeKey);
  };

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Mots-clés</h1>
          </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button onClick={() => setShowModal(true)} type="button" className="hover:bg-yellow-500 group flex items-center rounded-md bg-yellow-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
              <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
              </svg>
              Nouveau mot clé
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
                        Nouveau mot clé
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
                        <label htmlFor="website-keyword" className="block text-sm font-medium text-gray-700">
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="website-keyword"
                            id="website-keyword"
                            value={keyword}
                            onChange={handleChange}
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                            placeholder="Mot-clés"
                          />
                        </div>
                        <label htmlFor="website-url" className="block text-sm font-medium text-gray-700">
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                            http(s)://
                          </span>
                          <input
                            type="text"
                            name="website-url"
                            id="website-url"
                            value={url}
                            onChange={handleChangeUrl}
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                            placeholder="Adresse url"
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
        </div>
      </div>
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white relative w-1/4 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.url}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-1/4 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {sites.map((site) => (
                  <Listbox.Option
                    key={site.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={site}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {site.url}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
            </div>
            <table className="min-w-full table-fixed divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                    <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"/>
                  </th>
                  <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">Position</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mots-clés</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tendances</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Url</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
              {key.map((one, index) => (
                <tr>
                  <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                    <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"></div>
                    <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"/>
                  </td>
                  
                      <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">{one.position}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{one.keyword}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{one.tendance}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{one.url}</td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button onClick={() => onRemoveItem(index)} className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Supprimer<span className="sr-only">, {one.keyword}</span></button>
                    </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)
};