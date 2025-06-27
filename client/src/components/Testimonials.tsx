import React from "react";

const testimonials = [
  {
    name: "Maria Santos",
    role: "Job Seeker",
    quote:
      "Kareramo helped me land my first job right after graduation. The platform is easy to use and focused on opportunities here in the Philippines!",
  },
  {
    name: "Juan Dela Cruz",
    role: "HR Manager at TechHire",
    quote:
      "We found great candidates through Kareramo. It's refreshing to use a platform built specifically for the local market.",
  },
  {
    name: "Alyssa Reyes",
    role: "Freelancer",
    quote:
      "I’ve tried many job sites, but Kareramo stands out for its simplicity and relevance. Highly recommended!",
  },
];

const Testimonials = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 mt-[200px] md:mb-[300px]">
      <h2 className="text-3xl font-bold text-center mb-10">💬 What People Are Saying</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-100"
          >
            <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
            <div className="text-sm font-semibold text-gray-900">
              — {testimonial.name}
              <span className="block text-gray-500 text-xs">{testimonial.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
