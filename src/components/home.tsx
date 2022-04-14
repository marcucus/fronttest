import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { Link, RouteComponentProps } from '@reach/router'
import { Login } from './login'
import Google from "../assets/socials/google.svg"
import Logo from "../assets/logo/logo.svg"
import { Navbar } from './navbar'

const faqs = [
    {
      id: 1,
      question: "What's the best thing about Switzerland?",
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      id: 2,
      question: 'Why do you never see elephants hiding in trees?',
      answer:
        "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      id: 3,
      question: 'How do you make holy water?',
      answer:
        'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    },
    {
      id: 4,
      question: "Why can't you hear a pterodactyl go to the bathroom?",
      answer:
        'Because the pee is silent. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    },
    {
      id: 5,
      question: 'What do you call someone with no body and no nose?',
      answer: 'Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    },
    {
      id: 6,
      question: 'Why did the invisible man turn down the job offer?',
      answer:
        "He couldn't see himself doing it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
]

export const Home: React.FC<RouteComponentProps> = () => {
  return (
    <><div className="relative bg-gray-800 overflow-hidden">
          <main className="mt-16 sm:mt-24">
              <div className="mx-auto max-w-7xl">
                  <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                      <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                          <div>
                              <Link to="/ranking/list">
                              <a
                                  href="#"
                                  className="inline-flex items-center text-white bg-gray-900 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                              >
                                  <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-yellow-500 rounded-full">
                                      Bienvenue !
                                  </span>
                                  <span className="ml-4 text-sm">Connectez-vous !</span>
                                  <ChevronRightIcon className="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" />
                              </a>
                              </Link>
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
                      <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                          <div className="sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                              <div className="px-4 py-8 sm:px-10">
                                  <div>
                                  </div>
                                  <Login></Login>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </main><br/>
      </div>
        <div className="bg-gray-100">
              <div className="max-w-7xl mx-auto py-16 px-4 divide-y-2 divide-gray-200 sm:py-24 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-extrabold text-yellow-500">Frequently asked questions</h2>
                  <div className="mt-6 pt-10">
                      <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
                          {faqs.map((faq) => (
                              <div key={faq.id}>
                                  <dt className="text-lg leading-6 font-bold text-yellow-400">{faq.question}</dt>
                                  <dd className="mt-2 text-base text-gray-600">{faq.answer}</dd>
                              </div>
                          ))}
                      </dl>
                  </div>
              </div>
          </div></>
  )
}