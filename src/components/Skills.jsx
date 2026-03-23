import React from "react";

function Skills() {
  const skills = {
    Frontend: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
    Backend: ["Node.js", "MongoDB", "REST APIs", "Database Design"],
    Design: ["Figma", "Adobe Photoshop", "UI/UX Design", "Prototyping"],
    softSkills: [
      "Leadership",
      "Communication",
      "Time Management",
      "Creative Thinking",
      "Teamwork"
    ]
  };

  return (
    <section id="skills" className="min-h-screen bg-black py-20 px-6 md:px-20">
      
      {/* TITLE */}
      <div className="max-w-6xl mx-auto text-center md:text-left mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Skills
          <span className="block w-12 md:w-14 h-1 bg-blue-500 mt-4 mx-auto md:mx-0"></span>
        </h2>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-6xl mx-auto">
        {Object.entries(skills).map(([category, items], index) => (
          <div
            key={index}
            className="
              rounded-2xl sm:rounded-3xl p-6 sm:p-8
              bg-[#0b0f18]
              border border-blue-500/20
              transition-all duration-300
              hover:border-blue-500
              hover:shadow-xl hover:shadow-blue-500/20
            "
          >
            {/* CATEGORY TITLE */}
            <h3 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6 text-blue-400">
              {category === "softSkills" ? "Soft Skills" : category}
            </h3>

            {/* SKILL TAGS */}
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {items.map((skill, i) => (
                <span
                  key={i}
                  className="
                    px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl
                    text-xs sm:text-sm text-white
                    bg-[#0b1220] border border-black
                    transition-all duration-300 ease-out
                    hover:bg-blue-500/20
                    hover:border-blue-500
                    hover:text-blue-400
                    hover:-translate-y-1
                    hover:shadow-lg hover:shadow-blue-500/20
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Skills;