import React, { Fragment, useEffect } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import axios, { AxiosRequestConfig } from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";

export const Profil: React.FC<RouteComponentProps> = () => {

 /**
   * Infos utilisateurs
   */
    const token = "Bearer "+ localStorage.getItem('userToken');
    const userToken:any = localStorage.getItem('userToken');

/**
 * Users
 */
  const [info, setInfo] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);

  var head = {
    Authorization:token,
    "Content-Type": "application/json"
  };

  const requestOptions:AxiosRequestConfig = {
    headers: head
  };

  useEffect(() => {
  axios.get(`http://127.0.0.1:3333/users/info/${userToken}`,requestOptions)
  .then(res =>{
      setInfo(res.data);
    })
  },
  []);

  function remove(id:any){
    axios.delete(`http://127.0.0.1:3333/users/delete/${id}`,requestOptions)
      .then(res =>{
      console.log(res.data);
    })
    setOpen(false);
    navigate('/');
  }

    function classNames(...classes: any[]) {
      return classes.filter(Boolean).join(' ');
    }

return(
<>
  {info.map((user:any)=>
    <div className='mb-20'>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-yellow-500">Profil</h1>
            </div>
          </header>
        </div>
        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8 h-full">
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 h-auto w-auto min-h-[420px]">
              <section>
                  <div className="flex items-center justify-between">

                  </div>
              </section>
              <div className="-mx-4 mt-5 overflow-hidden  sm:-mx-6 md:mx-0 md:rounded-lg">
                <div className=" divide-y divide-gray-200">
                  <div className="space-y-1">
                    <p className="max-w-2xl text-sm text-gray-500">
                      Voici vos informations disponibles sur votre compte.
                    </p>
                  </div>
                  <div className="mt-6">
                    <dl className="divide-y divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-500">#</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className="flex-grow">{user.id}</span>
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className="flex-grow">{user.firstname} {user.lastname}</span>
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-500">Photo</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className="flex-grow">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.picture}
                              alt=""
                            />
                          </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <span className="flex-grow">{user.email}</span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            <br/>
            <button onClick={() => setOpen(true)} className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:yellow-yellow-500">Supprimer le compte</button>
              {open ? (
                <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Overlay className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                          <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button
                              type="button"
                              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                          <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                              <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                Supprimer le compte
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Vous êtes sûr de vouloir supprimer votre compte? Toutes vos données seront 
                                  supprimées de nos serveurs! Cette action ne peut pas être annulée.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                              type="button"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={() => remove(info[0].id)}
                            >
                              Supprimer
                            </button>
                            <button
                              type="button"
                              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:w-auto sm:text-sm"
                              onClick={() => setOpen(false)}
                            >
                              Annuler
                            </button>
                          </div>
                        </Dialog.Overlay>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
                </Transition.Root>
              ):null}
            </div>
          </div>
        </main>
      </div>
    </div>
  )}
</>
)
};