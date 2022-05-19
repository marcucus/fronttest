import React, { useEffect } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import { ReactSession } from 'react-client-session';

export const ListSite: React.FC<RouteComponentProps> = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [siteInfo, setSiteInfo] = React.useState([]);

    const token = "Bearer "+ReactSession.get('userToken');

      var head = {
        Authorization:token,
        "Content-Type": "application/json"
      };

      var requestOptions:RequestInit = {
        method: 'POST',
        headers: head,
        body:ReactSession.get('userToken'),
        redirect:"follow"
      };

        useEffect(() => {
        fetch('http://127.0.0.1:3333/sites/allbyuser', requestOptions)
        .then((res) => res.json())
        .then((res)=> {
          setSiteInfo(res);
        })},[]); 
  
    function classNames(...classes: any[]) {
      return classes.filter(Boolean).join(' ');
    }

    function onRemoveItem(id:any){

    }

    //const options = [];
    /*const nb = sites.length;
    for (let i = 0; i == nb; i++) {
      options.push(
        <tr>
        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm text-yellow-500 hover:text-yellow-600 sm:w-auto sm:max-w-none sm:pl-6">
            <Link to="/ranking/list/table/" className="font-bold">
              {site.url}
            </Link>
        </td>
        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{site.country}</td>
        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{site.createdAt}</td>
        <td className="px-3 py-4 text-sm text-yellow-500 font-bold hover:text-red-500 hover:font-bold">
          <button
            value={site.url}
            onClick={() => onRemoveItem(site.id)}
            className='flex font-bold hover:font-bold'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 font-bold hover:font-bold" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Supprimer</span>
          </button>
        </td>
      </tr>);
    }*/
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
                  <div className="relative w-full my-6 mx-auto max-w-3xl">
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
                            Url
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="company-website"
                              id="company-website"
                              //value={url}
                              //onChange={handleChangeUrl}
                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                              placeholder="http(s)://www.example.com/" />
                          </div><br/>
                          <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                            Localisation
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="website-country"
                              id="website-country"
                              //value={country}
                              //onChange={handleChangeCountry}
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
                          //onClick={handleAdd}
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
            </section>
            <div className="-mx-4 mt-5 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
            {siteInfo!==null || siteInfo!==undefined ? (
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
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Créé le 
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Outil
                    </th>
                  </tr>
                </thead>

                {siteInfo.map((results:any) =>(
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm text-yellow-500 hover:text-yellow-600 sm:w-auto sm:max-w-none sm:pl-6">
                        <Link to="/ranking/list/table/" className="font-bold">
                          {results.url}
                        </Link>
                    </td>
                    <td className="px-3 py-4 text-sm text-yellow-500 font-bold hover:text-red-500 hover:font-bold">
                      <button
                        value={results.url}
                        onClick={() => onRemoveItem(results.id)}
                        className='flex font-bold hover:font-bold'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 font-bold hover:font-bold" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Supprimer</span>
                      </button>
                    </td>
                  </tr>              
                </tbody>
                  ))}
              </table>
              ):(
                 <div>Pas de sites, créez en un !</div> 
                    )}
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
    </>
)
};