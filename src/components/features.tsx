import { RouteComponentProps } from "@reach/router"
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, CurrencyEuroIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'Protection des données',
    description:
      'Les données récupérés par Ranking ne seront ni revendues ni réutilisés hors du réseau Foudroyer !',
    icon: GlobeAltIcon,
  },
  {
    name: 'Moins cher que les concurrents',
    description:
      'Ne vous ruinez plus grâce a Ranking !',
    icon: CurrencyEuroIcon,
  },
  {
    name: 'Résultats instantanés',
    description:
      'Indiquez nous vos URL, vos mots-clés pour obtenir des résultats instantanés !',
    icon: LightningBoltIcon,
  },
  {
    name: 'Support personnalisé',
    description:
      'De vraies personnes présentes 7 jours sur 7 de 10h à 19h !',
    icon: AnnotationIcon,
  },
]

export const Features: React.FC<RouteComponentProps> = () => {
    return (
        <><br/>
          <div id="features" className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-yellow-500 font-semibold tracking-wide uppercase">Fonctionnalités</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Analysez vos performances.
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Pourquoi Ranking ? Car il va pousser les moteurs de recherches à vous donner vos positions ⚡️.
                    </p>
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-500 text-white">
                                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div><br/></>
    )
  }