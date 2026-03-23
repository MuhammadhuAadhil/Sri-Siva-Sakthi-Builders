import React from "react";

function About() {
  return (
    <section
      id="about"
      className="min-h-screen bg-black px-6 md:px-20 py-20"
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12">
          About Me
          <span className="block w-12 md:w-14 h-1 bg-blue-500 mt-4 mx-auto md:mx-0"></span>
        </h2>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left content */}
          <div className="space-y-6 max-w-xl mx-auto md:mx-0 text-center md:text-left">
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              I'm a motivated B.E CSE student at Arasu Engineering College
              with a strong foundation in programming and web development.
              With hands-on experience in full-stack development through my
              internship at Mind IT, I'm passionate about applying academic
              insights in real-world environments.
            </p>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              My expertise spans front-end technologies like React and
              JavaScript, design tools like Figma and Adobe Photoshop, and a
              deep understanding of creative problem-solving.
            </p>

            <p className="text-green-400 text-base sm:text-lg font-medium">
              Based in Kumbakonam, Tamil Nadu, India <br />
              Available for internships and full-time opportunities
            </p>
          </div>

          {/* Right cards */}
          <div className="space-y-6 w-full max-w-md mx-auto lg:mx-0">
            
            {/* Education */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-green-900/40 to-black border border-green-500/20">
              <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-2">
                Education
              </h3>
              <p className="text-gray-300">
                B.E Computer Science & Engineering
              </p>
              <p className="text-gray-500 text-sm">
                Arasu Engineering College
              </p>
            </div>

            {/* Experience */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/20">
              <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-2">
                Experience
              </h3>
              <p className="text-gray-300">
                Full Stack Development Internship
              </p>
              <p className="text-gray-500 text-sm">
                Mind IT, 2024
              </p>
            </div>

            {/* Recognition */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-red-900/40 to-black border border-red-500/20">
              <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-2">
                Recognition
              </h3>
              <p className="text-gray-300">
                AI Course – Grade A+
              </p>
              <p className="text-gray-500 text-sm">
                Rinex Organization, 2024
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;