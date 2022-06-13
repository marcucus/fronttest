import { RouteComponentProps } from "@reach/router"

const faqs = [
    {
      id: 1,
      question: "Puis-je connaitre la position de mon mot-clé dans n'importe quel pays ?",
      answer:
        "Bien évidement, nous disposons de près de 100 serveurs (dispersés dans presque tout les pays du monde) de recherches par moteur de recherche.",
    },
    {
      id: 2,
      question: 'J\'ai accès a combien de temps d\'historique ?',
      answer:
        "Vous avez un accès a un historique illimité ! Vous aurez votre historique du jour ou vous inscrivez votre mot-clé jusqu'au jour ou vous le supprimez.",
    },
    {
      id: 3,
      question: 'Pourquoi c\'est gratuit ?',
      answer:
        'Car nous faisons dans la charitée !',
    },
    {
      id: 4,
      question: "Suis-je limité en nombre de mots clés ? ",
      answer:
        'Non, vous avez un nombre de mots-clés illimités !',
    },
    {
      id: 5,
      question: 'Suis-je limité en nombre de sites ?',
      answer: 'Non, vous avez un nombre de sites illimités !',
    },
    {
      id: 6,
      question: 'A quelle fréquence mes mots-clés sont vérifiés ?',
      answer:
        "Toute les 24 heures, 7 jours sur 7 !",
    },
]

export const Faq: React.FC<RouteComponentProps> = () => {
    return (
          <div className="bg-gray-100">
              <div id="faq" className="max-w-7xl mx-auto py-16 px-4 divide-y-2 divide-gray-200 sm:py-24 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-extrabold text-yellow-500">Foire aux questions</h2>
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
          </div>
    )
  }