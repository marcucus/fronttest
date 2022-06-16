import { ChevronRightIcon } from '@heroicons/react/solid';
import { RouteComponentProps } from '@reach/router';
import { Faq } from './faq';
import { Pricing } from './pricing';
import { Features } from './features';
import { Login } from './login';

export const Home: React.FC<RouteComponentProps> = () => {
    localStorage.clear();
    sessionStorage.clear();
return (
<>
<div className="relative bg-gray-800 overflow-hidden min-h-[682px]">
    <main className="mt-16 sm:mt-24">
        <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                    <div>
                        <div
                            className="inline-flex items-center text-white bg-gray-900 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                        >
                            <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-yellow-500 rounded-full">
                                Bienvenue !
                            </span>
                            <span className="ml-4 text-sm">Connectez-vous !</span>
                            <ChevronRightIcon className="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" />
                        </div>
                        <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                            <span className="md:block">
                                Suivi de positionnement</span>{' '}
                            <span className="text-yellow-500 md:block">Foudroyer Tracking</span>
                        </h1>
                        <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                            Gardez une trace du classement de votre site Web sur Google avec des mises à jour automatiques grâce a notre puissant système de suivi.
                        </p>
                        <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">Moteurs de recherches</p>
                        <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                            <div className="flex flex-wrap items-start justify-between">
                                <div className="flex justify-center px-10">
                                    <img
                                        className="h-9 sm:h-10"
                                        src="https://www.vectorlogo.zone/logos/google/google-ar21.svg"
                                        alt="Google" />
                                </div>
                                <div className="flex justify-center px-10">
                                    <img
                                        className="h-9 sm:h-10"
                                        src="https://www.vectorlogo.zone/logos/bing/bing-ar21.svg"
                                        alt="Bing" />
                                </div>
                                <div className="flex justify-center px-10">
                                    <img
                                        className="h-9 sm:h-10"
                                        src="https://www.vectorlogo.zone/logos/yahoo/yahoo-ar21.svg"
                                        alt="Yahoo!" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:mt-24 lg:mt-0 lg:col-span-6">
                    <div className="sm:max-w-md mt-40 sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                        <div className="px-4 py-8 sm:px-10">
                            <div>
                            </div>
                            <Login></Login>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <br/>
    <div className=" text-center animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block w-6 h-6 text-gray-700"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7">
            </path>
        </svg>
    </div>
</div>
<Features></Features>
<Pricing></Pricing>
<Faq></Faq>
</>
  )
}