import React from 'react';

import { useParams } from 'react-router-dom';

function LessonDetail() {

  const { id } = useParams();

  const lessonContent: any = {

    1: {
      title: 'Introduction to Sustainability',
      content:
        'Sustainability means meeting our present needs without harming future generations. It includes protecting nature, reducing pollution, and saving resources.',
    },

    2: {
      title: 'Waste Management',
      content:
        'Waste management involves reducing, reusing, and recycling materials properly to reduce environmental pollution.',
    },

    3: {
      title: 'Biodiversity Conservation',
      content:
        'Biodiversity conservation protects plants, animals, and ecosystems to maintain balance in nature.',
    },
  };

  const lesson = lessonContent[id as keyof typeof lessonContent];

  return (

    <div className="min-h-screen px-6 py-16 bg-[#f4fff7]">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        <h1 className="text-5xl font-black text-green-700 mb-8">
          {lesson?.title}
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          {lesson?.content}
        </p>

      </div>

    </div>
  );
}

export default LessonDetail;