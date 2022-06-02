import { CheckIcon } from '@heroicons/react/solid'
import { RouteComponentProps } from '@reach/router'

const tiers = [
    {
      name: 'Gratuit',
      href: '#',
      priceMonthly: 0,
      description: 'Bien évidemment tout est gratuit !  ',
      features: [
        'Requêtes illimités',
        'Pas de carte de crédit !',
        'Gratuit',
        'Durée infinie',
        'Compte lié a Google'
      ],
    }
  ]

export const Pricing: React.FC<RouteComponentProps> = () => {
    return(
        <>
    <div className="bg-gray-800">
      <div id="pricing" className="pt-12 sm:pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
            <h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider">Prix</h2>
            <p className="text-3xl font-extrabold text-yellow-400 sm:text-4xl lg:text-5xl">
              Le bon prix pour vous.
            </p>
            <p className="text-xl text-gray-200">
              Un prix défiant toute concurrence
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 pb-12 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
        <div className="relative">
          <div className="absolute inset-0 h-3/4 bg-gray-800" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
          <div className="mt-4 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mt-5">
          <div className="max-w-md mx-auto lg:max-w-5xl">
            <div className="rounded-lg bg-white px-6 py-8 sm:p-10 lg:flex lg:items-center">
              <div className="flex-1">
                {tiers.map((tier) => (
                <><div className="mt-4 text-lg text-black">

                    <div>
                      <h3
                        className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-yellow-100 text-yellow-600"
                        id="tier-standard"
                      >
                        {tier.name}
                      </h3>
                    </div>
                    <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                      {tier.priceMonthly}€
                      <span className="ml-1 text-2xl font-medium text-gray-500">/mois</span>
                    </div>
                    <p className="mt-5 text-lg text-gray-500">{tier.description}</p>
                  </div><div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 space-y-6 sm:p-10 sm:pt-6">
                      <ul className="space-y-4">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                              <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                            </div>
                            <p className="ml-3 text-base text-gray-700">{feature}</p>
                          </li>
                        ))}
                      </ul>
                      <div className="rounded-md shadow">
                      <a
                        href={tier.href}
                        className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
                        aria-describedby="tier-standard"
                      >
                        Choisir la formule
                      </a>
                    </div>
                    </div>
                    </>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
        )
}