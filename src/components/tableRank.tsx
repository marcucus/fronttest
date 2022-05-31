import { Listbox, Transition, Dialog } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid";
import { RouteComponentProps } from "@reach/router";
import axios, { AxiosRequestConfig } from "axios";
import React, { Fragment, useEffect } from "react";
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'

export const TableRank: React.FC<RouteComponentProps> = () => {
  const [open, setOpen] = React.useState(false)
  const token = "Bearer "+ localStorage.getItem('userToken');
  const userToken=localStorage.getItem('userToken');
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
          setSitesSelect(res.data);
        })
        },[]);

        useEffect(() => {
          axios.get(`http://127.0.0.1:3333/keywords/keyworduser/${userToken}`,requestOptions)
          .then(res =>{
          setKey(res.data)
          })
        },[]);

        /*useEffect(() => {
          axios.get('http://127.0.0.1:3333/keywords/allbysite/3',requestOptions)
          .then(res =>{
            setKey(res.data)
          })
          },[]);*/
        
  const [showModal, setShowModal] = React.useState(false);

  const keys = [
    { position:1, keyword: 'haiku amour', url: 'https://www.temple-du-haiku.fr/exemples-de-haiku/amour/', maj: '2 hrs', od:'1', td:'5' , thd:'11', createdAt:new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString()},
    { position:1, keyword: 'haiku célèbre',url: 'https://www.temple-du-haiku.fr/exemples-de-haiku/' , maj: '2 hrs', od:'11', td:'5' , thd:'12', createdAt:new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString()},
    { position:1, keyword: 'haiku printemps', url: 'https://www.temple-du-haiku.fr/exemples-de-haiku/printemps/', maj: '2 hrs', od:'55', td:'45' , thd:'12', createdAt:new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString()},
    { position:2, keyword: 'google serp', url: 'https://www.google.com/google-serp', maj: '2 hrs', od:'1', td:'1' , thd:'2', createdAt:new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString()},
  ]

  const [sites, setSitesSelect] = React.useState([])
  const [selected, setSelected] = React.useState('0')

  const [key, setKey] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');
  const [server, setServer] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    if(selected=='0'){
      console.log('yes')
      setKey([])
      axios.get(`http://127.0.0.1:3333/keywords/keyworduser/${userToken}`,requestOptions)
      .then(res =>{
      setKey(res.data)
      })
    }
    else
    {
      console.log('no')
      setKey([])
      axios.get(`http://127.0.0.1:3333/keywords/allbysite/${selected}`,requestOptions)
      .then(res =>{
      setKey(res.data)
      })
    }
  },[]);

  function handleChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    setKeyword(event.target.value);
  }

  function handleChangeServer(event: { target: { value: React.SetStateAction<string>; }; }) {
    setServer(event.target.value);
  }

  function handleChangeSearch(event: { target: { value: React.SetStateAction<string>; }; }) {
    setSearch(event.target.value);
  }

  function handleAdd() {
    setShowModal(false);
    var raw = JSON.stringify([{
      "keywords": keyword,
      "country":server,
      "search":search,
      "siteid":3
    }]);
    
    var requestOptions = {
      method: 'POST',
      headers: head,
      body: raw
    };
    
    fetch("http://127.0.0.1:3333/keywords/create", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setKeyword('');
    setServer('');
    setUrl('');
  }
  console.log(selected)

  function onRemoveItem(id:any){
    axios.delete(`http://127.0.0.1:3333/keywords/delete/${id}`, requestOptions)
    window.location.reload()
  };

  function cut(date:any){
    console.log(date)
    const dateRepl=date.replace('T', ' ')
    const year=date.slice(0, 4);
    const month=date.slice(4,8);
    const day=date.slice(8,10);
    const newdate=day+month+year+' à '+dateRepl.slice(11,19)
    return newdate
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  console.log(key)

  return (
    <><div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-yellow-500">Dashboard</h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 min-h-[500px]">
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
              </button><br/>
              {showModal ? (
                <>
                  <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  >
                    <div className="relative w-full my-6 mx-auto max-w-3xl">
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
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                              Location
                            </label>
                            <select
                              id="location"
                              name="location"
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              value={server}
                              onChange={handleChangeServer}
                            >
                              <option>Choisir un pays</option>
                              <optgroup label="Afrique">
                                <option value="ZA01">Afrique du Sud (Le Cap)</option>
                              </optgroup>
                              <optgroup label="Asie">
                              <option value="AE01">Émirats arabes unis</option>
                                <option value="BH01">Bahreïn</option>
                                <option value="HK01">Hong Kong 1</option>
                                <option value="HK02">Hong Kong 2</option>
                                <option value="HK03">Hong Kong 3</option>
                                <option value="HK04">Hong Kong 4</option>
                                <option value="HK05">Hong Kong 5</option>
                                <option value="HK06">Hong Kong 6</option>
                                <option value="HK07">Hong Kong 7</option>
                                <option value="ID01">Indonésie 1</option>
                                <option value="ID02">Indonésie 2</option>
                                <option value="ID03">Indonésie 3</option>
                                <option value="IN01">Inde 1 (Bombay)</option>
                                <option value="IN02">Inde 2 (Bombay)</option>
                                <option value="IN03">Inde 3 (Mumbai)</option>
                                <option value="IN04">Inde 4 (Mumbai)</option>
                                <option value="IN05">Inde 5 (Mumbai)</option>
                                <option value="IN06">Inde 6 (Mumbai)</option>
                                <option value="JP01">Japon 1 (Tokyo)</option>
                                <option value="JP02">Japon 2 (Tokyo)</option>
                                <option value="JP03">Japon 3 (Tokyo)</option>
                                <option value="JP04">Japon 4 (Tokyo)</option>
                                <option value="JP05">Japon 5 (Tokyo)</option>
                                <option value="JP06">Japon 6 (Osaka)</option>
                                <option value="JP07">Japon 7 (Osaka)</option>
                                <option value="JP08">Japon 8 (Tokyo)</option>
                                <option value="KR01">Corée du Sud 1</option>
                                <option value="KR02">Corée du Sud 2</option>
                                <option value="KR03">Corée du Sud 3</option>
                                <option value="KR04">Corée du Sud 4</option>
                                <option value="MY01">Malaisie</option>
                                <option value="SG01">Singapour 1</option>
                                <option value="SG02">Singapour 2</option>
                                <option value="SG03">Singapour 3</option>
                                <option value="SG04">Singapour 4</option>
                                <option value="SG05">Singapour 5</option>
                                <option value="SG06">Singapour 6</option>
                                <option value="SG07">Singapour 7</option>
                                <option value="TH01">Thaïlande 1</option>
                                <option value="TH02">Thaïlande 2</option>
                                <option value="TW01">Taïwan (Changhua)</option>
                              </optgroup>
                              <optgroup label="Europe">
                                <option value="BE01">Belgique</option>
                                <option value="CH01">Suisse 1(Zurich)</option>
                                <option value="CH02">Suisse 2(Zurich)</option>
                                <option value="DE01">Allemagne 1 (Francfort-sur-le-Main)</option>
                                <option value="DE02">Allemagne 2 (Francfort-sur-le-Main)</option>
                                <option value="DE03">Allemagne 3 (Francfort-sur-le-Main)</option>
                                <option value="DE04">Allemagne 4 (Francfort-sur-le-Main)</option>
                                <option value="DE05">Allemagne 5 (Francfort-sur-le-Main)</option>
                                <option value="FR01">France 1 (Paris)</option>
                                <option value="FR02">France 2 (Centre)</option>
                                <option value="IE01">Irlande 1 (Dublin)</option>
                                <option value="IE02">Irlande 2 (Dublin)</option>
                                <option value="IT01">Italie (Milan)</option>
                                <option value="NL01">Pays-Bas (Amsterdam)</option>
                                <option value="PL01">Pologne (Varsovie)</option>
                                <option value="SE01">Suède (Stockholm)</option>
                                <option value="UK01">Royaume-Uni 1 (Londres)</option>
                                <option value="UK02">Royaume-Uni 2 (Londres)</option>
                                <option value="UK03">Royaume-Uni 3 (Londres)</option>
                                <option value="UK04">Royaume-Uni 4 (Londres)</option>
                                <option value="UK05">Royaume-Uni 5 (Pays de Galles)</option>
                                <option value="UK06">Royaume-Uni 6 (Londres)</option>
                              </optgroup>
                              <optgroup label="Amérique du Nord">
                                <option value="CA01">Canada 1 (Montréal)</option>
                                <option value="CA02">Canada 2 (Toronto)</option>
                                <option value="CA03">Canada 3 (Montréal)</option>
                                <option value="CA04">Canada 4 (Québec)</option>
                                <option value="US01">États-Unis 1 (Santa Clara)</option>
                                <option value="US02">États-Unis 2 (Virginie)</option>
                                <option value="US03">États-Unis 3 (San Jose)</option>
                                <option value="US04">États-Unis 4 (Dublin)</option>
                                <option value="US05">États-Unis 5 (Ashburn)</option>
                                <option value="US06">États-Unis 6 (San Francisco)</option>
                                <option value="US07">États-Unis 7 (Portland)</option>
                                <option value="US08">États-Unis 8 (Iowa)</option>
                                <option value="US09">États-Unis 9 (Caroline du Sud)</option>
                                <option value="US10">États-Unis 10 (Virginie du Nord)</option>
                                <option value="US11">États-Unis 11 (Salt Lake City)</option>
                                <option value="US12">États-Unis 12 (Dallas)</option>
                                <option value="US13">États-Unis 13 (Washington)</option>
                                <option value="US14">États-Unis 14 (Des Moines)</option>
                                <option value="US15">États-Unis 15 (Ashburn)</option>
                                <option value="US16">États-Unis 16 (Boyton)</option>
                                <option value="US17">États-Unis 17 (San Antonio)</option>
                                <option value="US18">États-Unis 18 (Santa Clara)</option>
                                <option value="US19">États-Unis 19 (Quincy)</option>
                                <option value="US20">États-Unis 20 (Los Angeles)</option>
                                <option value="US21">États-Unis 21 (Las Vegas)</option>
                                <option value="US22">États-Unis 22 (Oregon)</option>
                                <option value="US23">États-Unis 23 (Chicago)</option>
                                <option value="US24">États-Unis 24 (Santa Clara)</option>
                              </optgroup>
                              <optgroup label="Amérique du Sud">
                                <option value="BR01">Brésil (São Paulo) 1</option>
                                <option value="BR03">Brésil (São Paulo) 2</option>
                                <option value="BR02">Brésil (sud) :</option>
                                <option value="CL01">Chili</option>
                              </optgroup>
                              <optgroup label="Océanie">
                                <option value="AU01">Australie (Sydney) 1</option>
                                <option value="AU02">Australie (Sydney) 2</option>
                                <option value="AU03">Australie (Sydney) 3</option> 
                                <option value="AU04">Australie (Sydney) 4</option> 
                                <option value="AU05">Australie (Melbourne)</option>
                              </optgroup>
                            </select>
                          </div>
                          <div><br/>
                            <label htmlFor="website-keyword" className="block text-sm font-medium text-gray-700">
                              Mot-clé
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <input
                                type="text"
                                name="website-keyword"
                                id="website-keyword"
                                value={keyword}
                                onChange={handleChange}
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                placeholder="google test" />
                            </div><br/>
                          </div>
                          <div>
                          <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                            Moteur de recherche
                          </label>
                          <select
                              id="location"
                              name="location"
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              value={search}
                              onChange={handleChangeSearch}
                            >
                              <option selected>Choisir un pays</option>
                              <option value="Google">Google</option>
                              <option value="Yahoo">Yahoo!</option>
                              <option value="Bing">Bing</option>
                            </select>
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
          {open ? (
<div className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
    <div className="relative p-4 w-full max-w-7xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Extra Large modal
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="extralarge-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button data-modal-toggle="extralarge-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-toggle="extralarge-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
            </div>
        </div>
    </div>
</div>
          ):null}
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
                    <Dialog.Overlay className="relative bg-white rounded-lg w-80 px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
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
                            Deactivate account
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to deactivate your account? All of your data will be permanently removed
                              from our servers forever. This action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setOpen(false)}
                        >
                          Deactivate
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Overlay>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <div className="mt-1 relative">
                  
                  <Listbox.Button className="bg-white relative w-1/4 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm">
                    <span className="block truncate">Tout les mots-clés</span>
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
                      <Listbox.Option
                        key="0"
                        className={({ active }) => classNames(
                          active ? 'text-white bg-yellow-500' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        )}
                        value="0">
                        Tout les mots-clés
                        </Listbox.Option>
                        
                      {sites.map((site:any) => (
                        <Listbox.Option
                          key={site.id}
                          className={({ active }) => classNames(
                            active ? 'text-white bg-yellow-500' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )}
                          value={site.id}
                        >
                          {site.url}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        <div className="h-auto">
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
                          <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 sm:left-6" />
                        </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mots-clés</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Position</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Historique</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Serveur</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dernier check</th>                        
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Créé le</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {key.map((one:any) => (
                        <tr>
                          <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-yellow-500"></div>
                            <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 sm:left-6" />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{one.keywords}</td>
                          <td className="pl-7 whitespace-nowrap py-4 pr-3 text-sm text-gray-900">{one.position}</td>
                          <td className="pl-5 whitespace-nowrap py-4 pr-3 text-sm text-yellow-500">
                            <button onClick={() => setOpen(true)} className="hover:text-yellow-600">Historique</button>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{one.country}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cut(one.lastcheck)}</td>                                                    
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cut(one.createdat)}</td>
                          <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button onClick={() => onRemoveItem(one.id)} className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:yellow-indigo-500">Supprimer<span className="sr-only">, {one.keyword}</span></button>
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
    </div>
  </main>
</div>
</>
)
};