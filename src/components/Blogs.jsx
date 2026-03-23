import React, { useEffect, useState } from "react";
import axios from "axios";
import { ExternalLink, Github } from "lucide-react";
import auth from "../config/firebase";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [admin, setAdmin] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [liveDemo, setLiveDemo] = useState("");
  const [viewCode, setViewCode] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const techOptions = [
    "HTML","CSS","JavaScript","TypeScript","React","Next.js","Tailwind CSS",
    "Node.js","Express.js","MongoDB","Firebase","MySQL",
    "Git","Docker","AWS","Vercel","Netlify",
    "Figma","Adobe XD","Canva","API"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    const unsubscribe = auth.onAuthStateChanged(user => {
      setAdmin(user && user.uid === "6jFC5rEo9kNWU0gITWmiEEUmF7k1");
    });

    fetchBlogs();
    return () => unsubscribe();
  }, []);

  const fetchBlogs = () => {
    axios.get("http://localhost:5000/api/blogs")
      .then(res => setBlogs(res.data));
  };

  const toggleTech = (tech) => {
    setTechStack(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const handleNewBlogSubmit = (e) => {
    e.preventDefault();

    const payload = {
      newTitle,
      newContent,
      techStack,
      liveDemo,
      viewCode
    };

    const request = isEditing
      ? axios.put(`http://localhost:5000/api/blogs/${editId}`, payload)
      : axios.post("http://localhost:5000/api/blogs", {
          ...payload,
          likes: 0
        });

    request.then(() => {
      fetchBlogs();
      resetForm();
    });
  };

  const resetForm = () => {
    setNewTitle("");
    setNewContent("");
    setTechStack([]);
    setLiveDemo("");
    setViewCode("");
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setEditId(blog._id);

    setNewTitle(blog.newTitle);
    setNewContent(blog.newContent);
    setTechStack(blog.techStack || []);
    setLiveDemo(blog.liveDemo || "");
    setViewCode(blog.viewCode || "");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this project?")) return;
    axios.delete(`http://localhost:5000/api/blogs/${id}`)
      .then(() => fetchBlogs());
  };

  const handleLike = (id) => {
    axios.patch(`http://localhost:5000/api/blogs/like/${id}`)
      .then(() => fetchBlogs());
  };

  return (
    <section id="projects" className="min-h-screen bg-black text-white py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Featured Projects
            <span className="block w-12 md:w-14 h-1 bg-blue-500 mt-4 mx-auto md:mx-0"></span>
          </h2>
        </div>

        {/* ADMIN FORM */}
        {admin && (
          <form
            onSubmit={handleNewBlogSubmit}
            className="mb-16 p-5 sm:p-6 space-y-5 bg-white/5 rounded-2xl border border-white/10 shadow-lg max-w-3xl mx-auto"
          >
            <input
              type="text"
              placeholder="Project Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 rounded bg-black border border-white/10 text-sm sm:text-base"
              required
            />

            <textarea
              placeholder="Project Description"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-3 rounded bg-black border border-white/10 text-sm sm:text-base"
              rows="4"
              required
            />

            <div>
              <p className="text-sm text-gray-400 mb-2">Select Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {techOptions.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => toggleTech(tech)}
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm border transition
                      ${techStack.includes(tech)
                        ? "bg-sky-500 border-sky-500 text-white"
                        : "border-white/10 text-gray-400 hover:text-white"}`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="url"
              placeholder="Live Demo URL"
              value={liveDemo}
              onChange={(e) => setLiveDemo(e.target.value)}
              className="w-full p-3 rounded bg-black border border-white/10"
            />

            <input
              type="url"
              placeholder="View Code URL"
              value={viewCode}
              onChange={(e) => setViewCode(e.target.value)}
              className="w-full p-3 rounded bg-black border border-white/10"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 w-full sm:w-auto">
                {isEditing ? "Update Project" : "Add Project"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 rounded-full border border-white/20 text-gray-400 hover:text-white w-full sm:w-auto"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}

        {/* PROJECT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {blogs.map((blog, index) => (
            <div
              key={blog._id}
              className="rounded-3xl overflow-hidden bg-[#0b0f18] border border-white/10 transition-all duration-300
              hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-2"
            >
              <div className="h-40 sm:h-48 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white/30 relative">
                <span className="text-4xl sm:text-6xl font-bold">{index + 1}</span>
                <span className="text-xs sm:text-sm absolute bottom-4">Project Preview</span>
              </div>

              <div className="p-5 sm:p-7">
                <h3 className="text-lg sm:text-2xl font-semibold mb-3">{blog.newTitle}</h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4">{blog.newContent}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-400 bg-gray-900 border border-black hover:border-blue-600 hover:text-blue-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-400">
                  <button onClick={() => handleLike(blog._id)} className="hover:text-white">
                    ❤️ {blog.likes}
                  </button>

                  {blog.liveDemo && (
                    <a href={blog.liveDemo} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white">
                      <ExternalLink size={16} /> Live
                    </a>
                  )}

                  {blog.viewCode && (
                    <a href={blog.viewCode} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white">
                      <Github size={16} /> Code
                    </a>
                  )}

                  {admin && (
                    <>
                      <button onClick={() => handleEdit(blog)} className="text-blue-400 hover:text-blue-500 ml-auto">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(blog._id)} className="text-red-400 hover:text-red-600">
                        Delete
                      </button>
                    </>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Blogs;