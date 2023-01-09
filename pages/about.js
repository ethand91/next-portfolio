import Image from 'next/image';
import { useRouter } from 'next/router';

import aboutTranslations from './../public/assets/translations/about.json';

function AboutPage() {
  const { locale } = useRouter();

  const aboutItems = aboutTranslations.about.filter(item => item.locale === locale);

  return (
    <div className="pt-0 sm:pt-16">
      <div className="bg-gray-900 text-white w-12/12 shadow-lg sm:w-9/12 sm:m-auto">
        <div className="relative sm:w-full">
          <Image
            src="/background.jpg"
            alt="background"
            width={ 500 }
            height={ 500 }
            className="w-full h-96object-cover object-center"
          />

          <div className="bg-gray-900 bg-opacity-50 absolute flex items-end w-full h-full top-0 left-0 p-8">
            <Image
              src="/neko.jpeg"
              alt="profile image"
              width={ 500 }
              height={ 500 }
              className="bg-gray-300 w-20 rounded-full mr-4"
            />

            <div>
              <h1 className="font-bold text-3x1">
                { aboutItems[0].name }
              </h1>
              <p>{ aboutItems[0].jobTitle }</p>
            </div>
          </div>
        </div>
        <div className="p-8 text-white">
          <p>
            Hello! 👋
          </p>
          <p>
            { aboutItems[0].introduction }
          </p>
          <br />
          <p>
            { aboutItems[0].about1 }
          </p>
          <br/>
          <p>
            { aboutItems[0].about2 }
          </p>
          <br/>
          <p>
            { aboutItems[0].about3 }
          </p>
          <br/>
          <p>
            { aboutItems[0].about4 }
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
