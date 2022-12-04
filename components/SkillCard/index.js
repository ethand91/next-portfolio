import Image from 'next/image';

function SkillCard({ image, title, content }) {
  return (
    <div className="rounded-lg shadow-md bg-gray-900">
      <div className="p-4">
        <h4 className="text-xl font-semibold tacking-tight text-gray-50">
          { title }
        </h4>
        <p className="mb-2 leading-normal text-gray-50">
          { content }
        </p>
      </div>
    </div>
  );
};

export default SkillCard;
