import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import NavItem from './NavItem';
import navTranslations from './../../public/assets/translations/navigation.json';

function Navbar () {
  const [ navbar, setNavbar ] = useState(false);
  const { locale, locales, asPath } = useRouter(); 

  const navigationItems = navTranslations.navigation.filter(item => item.locale === locale);

  return (
    <>
      <nav className="flex items-center flex-wrap bg-gray-900 p-3">
        <Link href="/">
          <span className="text-xl text-white font-bold uppercase tracking-wide">
            Portfolio
          </span>
        </Link>
        <button className="inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-whitre outline-none" onClick={ () => setNavbar(!navbar) }>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.ord/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={ 2 }
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {
          navbar && 
            <ul className="items-center justify-center space-y-4 md:flex w-full lg:inline-flex lg:flex-grow lg:w-auto">
              <li>
                <NavItem link="/" title={ navigationItems[0].home } />
              </li>
              <li>
                <NavItem link="/experience" title={ navigationItems[0].experience } />
              </li>
              <li>
                <NavItem link="/blog" title={ navigationItems[0].blog } />
              </li>
              <li>
                <NavItem link="/about" title={ navigationItems[0].about } />
              </li>
              <li>
                <NavItem link="/contact" title={ navigationItems[0].contact } />
              </li>
              
              <li>
                <Link href="https://www.instagram.com/edenvir99/">
                  <Image
                    src="/instagram-logo.webp"
                    alt="instagram logo"
                    width={ 30 }
                    height={ 30 }
                    className="rounded-full ml-1.5"
                  />
                </Link>
              </li>

              <li>
                <Link href="https://github.com/ethand91">
                  <Image
                    src="/github-logo.png"
                    alt="instagram logo"
                    width={ 30 }
                    height={ 30 }
                    className="rounded-full ml-1.5"
                  />
                </Link>
              </li>
            </ul>
        }

        <div className="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto">
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <NavItem link="/" title={ navigationItems[0].home } />
            <NavItem link="/experience" title={ navigationItems[0].experience } />
            <NavItem link="/blog" title={ navigationItems[0].blog } />
            <NavItem link="/about" title={ navigationItems[0].about } />
            <NavItem link="/contact" title={ navigationItems[0].contact } />
            
            <Link href="https://www.instagram.com/edenvir99/">
              <Image
                src="/instagram-logo.webp"
                alt="instagram logo"
                width={ 30 }
                height={ 30 }
                className="rounded-full ml-1.5"
              />
            </Link>

            <Link href="https://github.com/ethand91">
              <Image
                src="/github-logo.png"
                alt="instagram logo"
                width={ 30 }
                height={ 30 }
                className="rounded-full ml-1.5"
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
