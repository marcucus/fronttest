import React, { Fragment, useEffect, useState } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import axios, { AxiosRequestConfig } from "axios";
import { Transition } from "@headlessui/react";
import { CalendarIcon, CheckCircleIcon, LocationMarkerIcon, UsersIcon, XIcon } from "@heroicons/react/outline";

export const ListSite: React.FC<RouteComponentProps> = () => {
  const [notif, setNotif] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false);
  const [siteInfo, setSiteInfo] = React.useState([]);

    const token = "Bearer "+ localStorage.getItem('userToken');
    const userToken:any = localStorage.getItem('userToken');
    console.log(localStorage.getItem('userToken'))
    
      var head = {
        Authorization:token,
        "Content-Type": "application/json"
      };

      const requestOptions:AxiosRequestConfig = {
        headers: head
      };

        useEffect(() => {
        axios.post('http://127.0.0.1:3333/sites/allbyuser',{token:userToken},requestOptions)
        .then(res =>{
          console.log(res.data)
          setSiteInfo(res.data);
        })
        },[]); 
  
    function classNames(...classes: any[]) {
      return classes.filter(Boolean).join(' ');
    }

    const [url, setUrl] = React.useState('');
    
    function handleChangeUrl(event: { target: { value: React.SetStateAction<string>; }; }) {
      setUrl(event.target.value);
    }

    function handleAdd() {
      setShowModal(false);
      var raw = JSON.stringify([{
        "url": url
      }]);
      
      var requestOptions = {
        method: 'POST',
        headers: head,
        body: raw
      };
      
      fetch("http://127.0.0.1:3333/sites/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        setNotif(true);
        setUrl('')
    }
  

    function onRemoveItem(id:any){
      axios.delete(`http://127.0.0.1:3333/sites/delete/${id}`, requestOptions)
      window.location.reload()
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
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 h-auto w-auto">
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
                              value={url}
                              onChange={handleChangeUrl}
                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                              placeholder="http(s)://www.example.com/" />
                          </div><br/>
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
            {notif ? (
              <div
              aria-live="assertive"
              className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
            >
              <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                <Transition
                  show={notif}
                  as={Fragment}
                  enter="transform ease-out duration-300 transition"
                  enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                  enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                          <p className="text-sm font-medium text-gray-900">test</p>
                          <p className="mt-1 text-sm text-gray-500">ui</p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                          <button
                            type="button"
                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {
                              setNotif(false)
                            }}
                          >
                            <span className="sr-only">Close</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>  
            ):null}
            </div>
            </section>
            <div className="-mx-4 mt-5 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
              {siteInfo!==null || siteInfo!==undefined ? (
                  <>
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                      <ul role="list" className="divide-y divide-gray-200">
                        {siteInfo.map((site: any) => (
                          <li key={site.url}>
                            <a href="#" className="block hover:bg-gray-50">
                              <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-yellow-500 truncate">{site.url}</p>
                                  <div className="ml-2 flex-shrink-0 flex">
                                    <p className="text-sm text-yellow-500 font-bold hover:text-red-500 hover:font-bold">
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
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    </>
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