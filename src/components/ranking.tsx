import React, { Fragment, useEffect, useState } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import axios, { AxiosRequestConfig } from "axios";
import { Transition } from "@headlessui/react";
import { CalendarIcon, CheckCircleIcon, LocationMarkerIcon, UsersIcon, XIcon } from "@heroicons/react/outline";
import { TableRank } from "./tableRank";
import { Helmet } from "react-helmet";
import { CategoryScale, Chart, ChartData, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

export const Ranking: React.FC<RouteComponentProps> = () => {

  /**
   * Infos utilisateurs
   */
    const token = "Bearer "+ localStorage.getItem('userToken');
    const userToken:any = localStorage.getItem('userToken');
  
  /**
   * Sites
   */
    const [notif, setNotif] = React.useState(false)
    const [showModalSite, setShowModalSite] = React.useState(false);
    const [siteInfo, setSiteInfo] = React.useState([]);
    const [selected, setSelected] = React.useState(0);
    const [urlSite, setUrlSite] = React.useState('');

  /**
   * Keywords
   */
    const [showModal, setShowModal] = React.useState(false);
    const [historyModal, setHistoryModal] = React.useState(false)
    const [sites, setSitesSelect] = React.useState([])
    const [siteKey, setSiteKey] = React.useState('');
    const [key, setKey] = React.useState([]);
    const [position, setPos] = React.useState([]);
    const [keyword, setKeyword] = React.useState('');
    const [server, setServer] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [dataH,setData] = React.useState<any>([]);
    const [label,setLabel]= React.useState<any>([]);

  /**
   * Récupère les mots-clé d'un site
   * @param id 
   */
    function selectedSite(id:any) {
      setKey([]);
      if(id==0){
        axios.get(`http://127.0.0.1:3333/keywords/keyworduser/${userToken}`,requestOptions)
          .then(res =>{
            setKey(res.data)
            console.log(key)
          });
      }
      else{
        axios.get(`http://127.0.0.1:3333/keywords/allbysite/${id}`,requestOptions)
          .then(res =>{
            setKey(res.data)
          });
      }
      
    }

  /**
   * Récupère tout les sites de l'utilisateur
   */
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
      setSiteInfo(res.data);
    })
    },[]);

  /**
   * Récupère tout les mots-clé de l'utilisateur
   */
    useEffect(() => {
      setKey([])
        axios.get(`http://127.0.0.1:3333/keywords/keyworduser/${userToken}`,requestOptions)
        .then(res =>{
        setKey(res.data)
      })
      },[]);
  
  /**
   * Récupère l'url entré par l'utilisateur puis l'enregistre
   * @param event
   */
    function handleChangeUrl(event: { target: { value: React.SetStateAction<string>; }; }) {
      setUrlSite(event.target.value);
    }

    function handleAddSite() {
      setShowModalSite(false);
      var raw = JSON.stringify([{
        "url": urlSite
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

  /**
   * Récupère le mot-clé, le moteur de recherche et le serveur choisis puis l'enregistre
   * @param event
   */
    function handleChange(event: { target: { value: React.SetStateAction<string>; }; }) {
      setKeyword(event.target.value);
    }

    function handleChangeServer(event: { target: { value: React.SetStateAction<string>; }; }) {
      setServer(event.target.value);
    }

    function handleChangeSearch(event: { target: { value: React.SetStateAction<string>; }; }) {
      setSearch(event.target.value);
    }
    function handleChangeSiteKey(event: { target: { value: React.SetStateAction<string>; }; }){
      setSiteKey(event.target.value)
    }
    function handleAdd() {
      setShowModal(false);
      var raw = JSON.stringify([{
        "keywords": keyword,
        "country":server,
        "search":search,
        "siteid":siteKey
      }]);
      
      var requestOptions = {
        method: 'POST',
        headers: head,
        body: raw
      };
      
      fetch("http://127.0.0.1:3333/keywords/create", requestOptions)
        .then(response => response.text())
        .then(result => result)
        .catch(error => error);
  
      setKeyword('');
      setServer('');
      setUrl('');
      setSiteKey('')
    }
  
  /**
   * Récupère l'id du site puis le supprime
   * @param id 
   */
    function onRemoveSite(id:any){
      axios.delete(`http://127.0.0.1:3333/sites/delete/${id}`, requestOptions)
      window.location.reload()
    }

  /**
   * Récupère l'id du mot-clé puis le supprime
   * @param id 
   */
    function onRemoveItem(id:any){
      axios.delete(`http://127.0.0.1:3333/keywords/delete/${id}`, requestOptions)
      window.location.reload()
    }; 

    /**
     * Mise en forme de la date
     * @param date 
     * @returns newdate
     */
      function cut(date:any){
        const dateRepl=date.replace('T', ' ')
        const year=date.slice(0, 4);
        const month=date.slice(4,8);
        const day=date.slice(8,10);
        const newdate=day+month+year+' à '+dateRepl.slice(11,19)
        return newdate
      }
  
    /**
     * Mise en forme du mot-clé
     * @param name 
     * @returns 
     */
      function name(name:string){
        const replacedName= name.replace("+",' ')
        return replacedName;
      }

      Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      
    /**
     * Récupère l'historique d'un mot-clé
     * @param id 
     */
      async function historykey(id:any){
        setPos([])
        setHistoryModal(true)
        axios.get(`http://127.0.0.1:3333/keywords/getPos/${id}`,requestOptions)
          .then(res =>{
              setPos(res.data);
        })
        chart();
      }

      async function chart() {
        var info:any = position;
        var label: any[]=[];
        var dat:any[]=[]
          info[0].json_build_object.pos.forEach((element: any) => {
            label.push(element.pdate)
            dat.push(element.ppos)
          });
          setLabel(label)
          setData(dat)
      }

      const data={
        labels:label,
        datasets: [
          {
            label: 'Position',
            data: dataH,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ]}

      function classNames(...classes: any[]) {
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
        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-full lg:px-8">
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    
                    <div className="p-6">
                    <button onClick={() => setShowModalSite(true)} type="button" className="hover:bg-yellow-500 group flex items-center rounded-md bg-yellow-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                    <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                      <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                    </svg>
                    Nouveau site
                  </button> <br/>
                      {siteInfo!==null || siteInfo!==undefined ? (
                  <>
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                      <ul role="list" className="divide-y divide-gray-200">
                        {siteInfo.map((site: any) => (
                          <li key={site.url}>
                            <button onClick={()=> selectedSite(site.id)} className="block hover:bg-gray-50 h-full w-full">
                              <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-bold text-yellow-500 truncate">{site.url}</p>
                                  <div className="ml-2 flex-shrink-0 flex">
                                    <p className="text-sm text-yellow-500 font-bold hover:text-red-500 hover:font-bold">
                                      <button
                                        value={site.url}
                                        onClick={() => onRemoveSite(site.id)}
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
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    </>
              ):(
                 <div>Pas de sites, créez en un !</div> 
                    )}</div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      <table>
                        <tr>
                          <td>
                            <button onClick={() => setShowModal(true)} type="button" className="hover:bg-yellow-500 group flex items-center rounded-md bg-yellow-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                              <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                              </svg>
                              Nouveau mot clé
                            </button>
                          </td>

                          <td>
                            <button onClick={() => selectedSite(0)} type="button" className="hover:bg-yellow-500 group flex items-center rounded-md bg-yellow-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                              Afficher tout les mots-clés
                            </button>
                          </td>
                        </tr>
                      </table>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
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
                            Site
                          </label>
                          <select
                              id="location"
                              name="location"
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              value={siteKey}
                              onChange={handleChangeSiteKey}
                            >
                              <option>Choisir un site</option>
                              {siteInfo.map((site: any) => (
                                <option value={site.id}>{site.url}</option>
                              ))}
                            </select>
                          </div><br/>
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
                              <option>Choisir un moteur de recherche</option>
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
          {historyModal ? (
            <>
<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
    <div className="relative p-4 w-full max-w-7xl max-h-4xl md:h-auto">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
            <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Historique de position
                </h3>
                <button onClick={() => setHistoryModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="extralarge-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {position.map((posi:any)=>(
                  <>
                  <Line options={options} data={data} />
                  {posi.id}
                  {posi.json_build_object.pos.map((hist:any)=>(
                    <>
                      <p>
                      
                        {hist.pid}
                        {hist.pkid}
                        {hist.ppos}
                        {cut(hist.pdate)}
                      </p>
                    </>
                  ))}
                  </>
                ))}
              </p>
        </div>
    </div>
</div>
</div>
</>
          ):null}

        
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
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mots-clés</th>
                    <abbr title="Position actuelle"><th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Position</th></abbr>
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
                  {key.map((one: any) => (
                    <tr>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{name(one.keywords)}</td>
                      <td className="pl-7 whitespace-nowrap py-4 pr-3 text-sm text-gray-900">{one.position}</td>
                      <td className="pl-5 whitespace-nowrap py-4 pr-3 text-sm text-yellow-500">
                        <button onClick={() => historykey(one.id)} className="hover:text-yellow-600">Historique</button>
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
                </section>
              </div>

              
            </div>
          </div>
        </main>
        {showModalSite ? (
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
                          onClick={() => setShowModalSite(false)}
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
                              value={urlSite}
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
                          onClick={() => setShowModalSite(false)}
                        >
                          Annuler
                        </button>
                        <button
                          className="text-white bg-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleAddSite}
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
      {/*<main className="-mt-32">
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
              </main>*/}
    </div>
  </div>
    </>
)
};