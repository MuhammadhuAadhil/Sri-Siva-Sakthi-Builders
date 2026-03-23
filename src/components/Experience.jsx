import React from "react";

function Experience() {
  const experiences = [
    {
      role: "Full Stack Development Internship",
      company: "Mind IT",
      year: "2024",
      description:
        "Developed and deployed full-stack applications, working with modern web technologies and industry best practices.",
      tags: ["Full Stack Development", "Web Technologies", "Project Delivery"]
    },
    {
      role: "Artificial Intelligence Course",
      company: "Rinex Organization",
      year: "2024",
      description:
        "Completed comprehensive AI course with Grade A+, gaining deep insights into machine learning and AI concepts.",
      tags: ["Machine Learning", "AI Concepts", "Grade A+"]
    },
    {
      role: "Event Organizer & Team Lead",
      company: "Arasu Engineering College",
      year: "2022 - 2025",
      description:
        "Organized academic events and led college project teams, developing leadership and organizational skills.",
      tags: ["Leadership", "Organization", "Team Coordination"]
    }
  ];

  return (
    <section id="experience" className="min-h-screen bg-black py-20 px-6 md:px-20">
      
      {/* SECTION TITLE */}
      <div className="max-w-6xl mx-auto text-center md:text-left mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Experience
          <span className="block w-12 md:w-14 h-1 bg-blue-500 mt-4 mx-auto md:mx-0"></span>
        </h2>
      </div>

      {/* EXPERIENCE CARDS */}
      <div className="max-w-5xl mx-auto space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-black p-6 sm:p-8 md:p-10 rounded-2xl border border-blue-950
            transition-all duration-300 ease-out
            hover:-translate-y-2 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
          >
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white hover:text-blue-500 transition">
                  {exp.role}
                </h3>
                <p className="text-blue-500 mt-1">{exp.company}</p>
              </div>

              <span className="text-gray-400 text-sm sm:text-base">
                {exp.year}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-300 mb-5 leading-relaxed text-sm sm:text-base">
              {exp.description}
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {exp.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-full bg-blue-600/20 text-blue-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;