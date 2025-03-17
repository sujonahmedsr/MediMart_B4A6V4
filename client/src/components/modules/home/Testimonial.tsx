import Image from 'next/image';
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    feedback: "Medimart has always delivered medicines on time. Great service and reliability!",
    role: "Regular Customer",
    img: null
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback: "I love the wide variety of medicines available here. Highly recommend!",
    role: "Healthcare Professional",
    img: null
  },
  {
    id: 3,
    name: "Albert Green",
    feedback: "The prices are affordable, and customer support is amazing. I trust Medimart for all my needs.",
    role: "Loyal Customer",
    img: null
  },
  {
    id: 4,
    name: "Sarah Williams",
    feedback: "Medimart makes it easy to get essential medicines delivered to my door. Always my go-to site.",
    role: "Frequent User",
    img: null
  },
  {
    id: 5,
    name: "Michael Brown",
    feedback: "Fast and secure delivery service. I never worry about running out of medicine.",
    role: "Happy Client",
    img: null
  },
  {
    id: 6,
    name: "Emily Davis",
    feedback: "Great variety of products and fast delivery. The app is easy to use!",
    role: "Satisfied Customer",
    img: null
  },
];

const Testimonial = () => {
  return (
    <section className="my-16 container mx-auto">
      <h2 className="text-3xl font-bold text-center text-cyan-900 mb-8">Our Honorable Customers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map(({ id, name, feedback, role, img }) => (
          <div key={id} className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition-shadow duration-300 border">
            <Image src={img || "https://github.com/shadcn.png"} alt={name} width={250} height={250} className="w-16 h-16 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center text-gray-800">{name}</h3>
            <p className="text-center text-gray-600 text-sm mb-4">{role}</p>
            <p className="text-center text-gray-500 italic">{`"${feedback}"`}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
