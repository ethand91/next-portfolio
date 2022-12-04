import SkillCard from './../components/SkillCard';

function SkillsPage() {
  return (
    <div className="grid grid-cols-3 gap-4 gap-x-3 items-stretch content-center place-items-center mt-5 mx-2 flex">
      <div className="flex w-full">
        <SkillCard
          title="JavaScript"
          content="Mostly for developing front end sites, using frameworks such as React also used on server side. "
        />
      </div>
      <div className="flex w-full max-w-full">
        <SkillCard
          title="TypeScript"
          content="Pretty much the same as JavaScript, used to create front end applications as well as server side"
        />
      </div>
      <div className="flex w-full">
        <SkillCard
          title="C/C++"
          content="For creating native FFmpeg/GStreamer applications, sometimes use it with OpenCV"
        />
      </div>
      <div className="flex w-full">
        <SkillCard
          title="Java"
          content="For creating server side applications with Tomcat/Spring Boot, also used it to create Android applications"
        />
      </div>
      <div className="flex w-full">
        <SkillCard
          title="Kotlin"
          content="For creating Android applications, also its the main language for Android Compose"
        />
      </div>
      <div className="flex w-full">
        <SkillCard
          title="Swift"
          content="For building iOS applications, however I don't have a Mac anymore :("
        />
      </div>
      <div className="flex w-full">
        <SkillCard
          title="Rails/Ruby"
          content="For building an adminstor page I mostly use this for side projects."
        />
      </div>
      <div className="flex w-full">
        <SkillCard
          title="Laravel/PHP"
          content="For building an administor page also used for various side projects."
        />
      </div>
      <div className="flex w-full">
        <SkillCard
          title="Android Compose"
          content="For creating a matchmaking application, still pretty new"
        />
      </div>
      <div className="flex w-full min-w-max">
        <SkillCard
          title="FFmpeg"
          content="For live streaming/recording. Also transcoding"
        />
      </div>
      <div className="flex w-full">
        <SkillCard
          title="GStreamer"
          content="Pretty much the same as FFmpeg but GStreamer is used mostly for live streaming"
        />
      </div>
      <div className="flex w-full">
        <SkillCard
          title="WebRTC"
          content="For live streaming services, I've also used various SFUs/MCUs mostly mediasoup"
        />
      </div>
    </div>
  );
};

export default SkillsPage;
