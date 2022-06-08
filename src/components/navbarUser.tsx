import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link, RouteComponentProps } from '@reach/router'
import Logo from '../assets/logo/logo.svg'


const userNavigation = [
  { name: 'Profil', href: '/user' },
  { name: 'Se déconnecter', href: '/' },
]

var picture:any=localStorage.getItem('picture');


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const Item: React.FC<{ to: string }> = (props) => (
  <Link
    to={props.to}
    className="px-2 py-1 text-gray-400 transition-all duration-300 ease-in-out border-b-2 border-transparent hover:border-yellow-400 hover:text-white"
  >
    {props.children}
  </Link>
)

export const NavbarUser: React.FC<RouteComponentProps> = () => {
return (
    <>
        <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                    <Link to='/'>
                        <img
                            className="block lg:hidden h-8 w-auto"
                            src={Logo}
                            alt="Foudroyer"
                        />
                        <img
                            className="hidden lg:block h-8 w-auto"
                            src={Logo}
                            alt="Foudroyer"
                        />
                    </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                      <Link to="/">
                      <div
                        className= 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                        Accueil
                      </div>
                      </Link>
                      <Link to="/ranking">
                        <div
                        className= 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                        Dashboard
                      </div>
                      </Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

              <Menu as="div" className="ml-4 relative flex-shrink-0">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={picture} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <Link to='/profil' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                              Profil
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link to='/' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'>
                              Se déconnecter
                            </Link>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
              </div>
            </div>
          </div>

          
        </>
      )}
    </Disclosure>      
    </>
  )
}