import { useRouter } from 'next/router';

import experienceTranslations from './../public/assets/translations/experience.json';

function ExperiencePage() {
  const { locale } = useRouter();

  const experienceItems = experienceTranslations.experience.filter(item => item.locale === locale);

  return (
    <div className="pt-0 sm:pt-16">
      <h1 className="text-2xl font-bold w-12/12 sm:w-9/12 sm:m-auto">
        { experienceItems[0].title }
      </h1>
      <br />

      {
        experienceItems[0].jobs.map(({ title, description }) => (
          <div key={ title }>
            <div className="bg-gray-900 text-white w-12/12 shadow-lg sm:w-9/12 sm:m-auto">
              <div className="w-full p-4 shadow-md">
                <h1 className="text-2xl font-semibold">
                  { title }
                </h1>
                <br />

                <p className="w-full">
                  { description }
                </p>
              </div>
            </div>

            <br />
          </div>
        ))
      }
    </div>
  );
};

export default ExperiencePage;
