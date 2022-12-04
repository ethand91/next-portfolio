import Image from 'next/image';

function AboutPage() {
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
              src="/gray.jpeg"
              alt="profile image"
              width={ 500 }
              height={ 500 }
              className="bg-gray-300 w-20 rounded-full mr-4"
            />

            <div>
              <h1 className="font-bold text-3x1">
                Ethan Denvir
              </h1>
              <p>FullStack Developer</p>
            </div>
          </div>
        </div>
        <div className="p-8 text-white">
          <p>
            Hello! 👋
          </p>
          <p>
            Im Ethan, a FullStack Developer based in Japan.
          </p>
          <br />
          <p>
            Ive spent the past 10+ years working across difference areas of backend development, devloping Android/iOS applications to production, monitoring and administrating servers. I also have experience with WebRTC and developing live streaming services and solutions from scratch.
          </p>
          <br/>
          <p>
            These days my time is spent researching GStreamer, playing with Android Compose and learning front end design/development. I also enjoy learning blackhat hacking.
          </p>
          <br/>
          <p>
            During my free time I usually workout, go running/hiking or working on various side projects and petting all the good dogs. 
          </p>
          <br/>
          <p>
            I also teach people how to code via my blog/mentoring
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
