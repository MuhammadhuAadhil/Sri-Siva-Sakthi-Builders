import React, { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../config/firebase";
import { db } from "../config 2/firebasedb.js";
import project1 from "../assets/project1.png";
import project2 from "../assets/project 2.jpeg";
import project3 from "../assets/project 3.jpeg";
import project4 from "../assets/project 4.jpeg";
import project5 from "../assets/project 5.jpeg";

const fallbackProjects = [
  {
    _id: "1",
    title: "Agraharam Type Twin House",
    category: "Residential",
    image: project1,
    details: {
      builtUpArea: "800 Sq.ft Each",
      location: "Thirucherai",
      floors: "Ground Floor",
      facing: "East",
      price: "Rs.2200/sq.ft",
      type: "Residential",
    },
    client: {
      name: "Mr. L. Shiva",
      occupation: "Private",
      description: "Twin house project located in Thirucherai with compact and efficient 2BHK design.",
    },
  },
  {
    _id: "2",
    title: "Modern Residential Home",
    category: "Residential",
    image: project2,
    details: {
      builtUpArea: "1200 Sq.ft",
      location: "Kumbakonam",
      floors: "Ground+1",
      facing: "North",
      price: "Rs.2400/sq.ft",
      type: "Residential",
    },
    client: {
      name: "Mr.P.Balu",
      occupation: "DLF",
      description: "A well-planned 3BHK home located in Christraja Nagar designed for comfortable family living.",
    },
  },
  {
    _id: "3",
    title: "Compact Residential Home",
    category: "Residential",
    image: project3,
    details: {
      builtUpArea: "900 Sq.ft",
      location: "Kumbakonam",
      floors: "Ground Floor",
      facing: "West",
      price: "Rs.2000/sq.ft",
      type: "Residential",
    },
    client: {
      name: "Mr.P.Srinivasan",
      occupation: "Private",
      description: "A compact and efficient 2BHK home located in Kumbakonam, designed for comfortable living",
    },
  },
  {
    _id: "4",
    title: "Affordable Mini House",
    category: "Residential",
    image: project4,
    details: {
      builtUpArea: "400 Sq.ft",
      location: "Kumbakonam",
      floors: "Ground Floor",
      facing: "West",
      price: "Rs.8,00,000",
      type: "Residential",
    },
    client: {
      name: "Mr. Pounraj",
      occupation: "Private",
      description: "A Well planned Affordable 1BHK home located in Kumbakonam, designed for Couples Living.",
    },
  },
  {
    _id: "5",
    title: "Riverview restaurant",
    category: "Commercial",
    image: project5,
    details: {
      builtUpArea: "3200 Sq.ft",
      location: "Kumbakonam",
      floors: "Ground Floor",
      facing: "West",
      price: "Rs.2400/sq.ft",
      type: "Commercial",
    },
    client: {
      name: "Mr.K.Samiraj",
      occupation: "Private",
      description:
        "A well-planned riverside restaurant with both indoor and outdoor dining, located in Kumbakonam, designed for a peaceful dining experience away from pollution.",
    },
  },
];

const projectsCollection = collection(db, "projects");
const cloudinaryCloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const mergeProjects = (defaultProjects, storedProjects) => {
  const projectMap = new Map();

  defaultProjects.forEach((project) => {
    projectMap.set(project._id, project);
  });

  storedProjects.forEach((project) => {
    projectMap.set(project._id, project);
  });

  return Array.from(projectMap.values());
};

const loadImage = (file) =>
  new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Selected image could not be processed."));
    };

    image.src = objectUrl;
  });

const canvasToBlob = (canvas, type, quality) =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Image compression failed."));
        return;
      }
      resolve(blob);
    }, type, quality);
  });

function Projects() {
  const scrollRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("project");
  const [admin, setAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState(fallbackProjects);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [details, setDetails] = useState({
    builtUpArea: "",
    location: "",
    floors: "",
    facing: "",
    price: "",
    type: "",
  });
  const [client, setClient] = useState({
    name: "",
    occupation: "",
    description: "",
  });

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdmin(Boolean(user && user.uid === "n4nMl4BYAzgzfkWkvbnimg8HfIx1"));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(projectsCollection);
        let storedProjects = querySnapshot.docs.map((projectDoc) => ({
          _id: projectDoc.id,
          ...projectDoc.data(),
        }));

        const storedProjectIds = new Set(
          storedProjects.map((project) => project._id)
        );
        const missingDefaultProjects = fallbackProjects.filter(
          (project) => !storedProjectIds.has(project._id)
        );

        if (missingDefaultProjects.length > 0) {
          await Promise.all(
            missingDefaultProjects.map((project) =>
              setDoc(doc(db, "projects", project._id), {
                title: project.title,
                category: project.category,
                image: project.image,
                details: project.details,
                client: project.client,
              })
            )
          );

          storedProjects = mergeProjects(storedProjects, missingDefaultProjects);
        }

        setProjects(mergeProjects(fallbackProjects, storedProjects));
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setImagePreview("");
    setImageFile(null);
    setDetails({
      builtUpArea: "",
      location: "",
      floors: "",
      facing: "",
      price: "",
      type: "",
    });
    setClient({
      name: "",
      occupation: "",
      description: "",
    });
    setIsEditing(false);
    setEditId(null);
    setFormError("");
  };

  const compressImageForUpload = async (file) => {
    if (!file.type.startsWith("image/")) {
      throw new Error("Please choose a valid image file.");
    }

    if (file.size <= 900 * 1024) {
      return file;
    }

    const image = await loadImage(file);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Image compression is not supported in this browser.");
    }

    const maxDimension = 1600;
    const scale = Math.min(maxDimension / image.width, maxDimension / image.height, 1);
    canvas.width = Math.round(image.width * scale);
    canvas.height = Math.round(image.height * scale);

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await canvasToBlob(canvas, "image/jpeg", 0.8);
    return new File([blob], `${file.name.split(".")[0] || "project-image"}.jpg`, {
      type: "image/jpeg",
    });
  };

  const uploadProjectImage = async () => {
    if (!imageFile) {
      return imagePreview || "https://via.placeholder.com/400";
    }

    if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
      throw new Error(
        "Cloudinary config missing. Add REACT_APP_CLOUDINARY_CLOUD_NAME and REACT_APP_CLOUDINARY_UPLOAD_PRESET."
      );
    }

    const processedImage = await compressImageForUpload(imageFile);
    const formData = new FormData();
    formData.append("file", processedImage);
    formData.append("upload_preset", cloudinaryUploadPreset);
    formData.append("folder", "sss-builders/projects");

    let response;

    try {
      response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
    } catch (error) {
      throw new Error(
        "Cloudinary request failed before upload completed. Check internet, firewall, VPN, or DNS and try again."
      );
    }

    let result;

    try {
      result = await response.json();
    } catch (error) {
      throw new Error(
        `Cloudinary returned HTTP ${response.status}, but the response could not be read.`
      );
    }

    if (!response.ok || !result.secure_url) {
      throw new Error(
        result.error?.message ||
          `Cloudinary upload failed with HTTP ${response.status}.`
      );
    }

    return result.secure_url;
  };

  const buildProjectPayload = async () => ({
    title: title.trim(),
    category: category.trim(),
    image: await uploadProjectImage(),
    details: {
      builtUpArea: details.builtUpArea.trim(),
      location: details.location.trim(),
      floors: details.floors.trim(),
      facing: details.facing.trim(),
      price: details.price.trim(),
      type: details.type.trim(),
    },
    client: {
      name: client.name.trim(),
      occupation: client.occupation.trim(),
      description: client.description.trim(),
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      setSubmitting(true);
      const projectPayload = await buildProjectPayload();

      if (isEditing && editId) {
        await updateDoc(doc(db, "projects", editId), projectPayload);

        setProjects((prev) =>
          prev.map((project) =>
            project._id === editId ? { _id: editId, ...projectPayload } : project
          )
        );

        setSelectedProject((prev) =>
          prev && prev._id === editId ? { _id: editId, ...projectPayload } : prev
        );
      } else {
        const newProjectRef = await addDoc(projectsCollection, projectPayload);
        setProjects((prev) =>
          mergeProjects(prev, [{ _id: newProjectRef.id, ...projectPayload }])
        );
      }

      resetForm();
    } catch (error) {
      console.error("Failed to save project:", error);
      setFormError(error.message || "Project save failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setEditId(project._id);
    setTitle(project.title || "");
    setCategory(project.category || "");
    setImagePreview(project.image || "");
    setImageFile(null);
    setDetails({
      builtUpArea: project.details?.builtUpArea || "",
      location: project.details?.location || "",
      floors: project.details?.floors || "",
      facing: project.details?.facing || "",
      price: project.details?.price || "",
      type: project.details?.type || "",
    });
    setClient({
      name: project.client?.name || "",
      occupation: project.client?.occupation || "",
      description: project.client?.description || "",
    });
    setFormError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects((prev) => prev.filter((project) => project._id !== id));
      setSelectedProject((prev) => (prev && prev._id === id ? null : prev));
    } catch (error) {
      console.error("Failed to delete project:", error);
      setFormError("Project delete failed. Please try again.");
    }
  };

  return (
    <section id="projects" className="bg-white py-24 px-6 md:px-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-yellow-600 text-xs uppercase tracking-widest">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-2">
            Architectural Landmarks
          </h2>
        </div>

        <div className="flex gap-3">
          <button onClick={() => scroll("left")} className="nav-btn">
            {"<"}
          </button>
          <button onClick={() => scroll("right")} className="nav-btn">
            {">"}
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-10">
        {["All", "Residential", "Commercial"].map((filterValue) => (
          <button
            key={filterValue}
            onClick={() => setFilter(filterValue)}
            className={`px-4 py-2 rounded-full border ${
              filter === filterValue
                ? "bg-yellow-500 text-black"
                : "text-black border-gray-300"
            }`}
          >
            {filterValue}
          </button>
        ))}
      </div>

      {admin && (
        <div className="mb-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-black">
            {isEditing ? "Edit Project" : "Add New Project"}
          </h3>

          <form
            onSubmit={handleSubmit}
            className="bg-black text-white p-6 rounded-2xl space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="p-3 rounded bg-gray-900 border border-gray-700"
                required
              />
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="p-3 rounded bg-gray-900 border border-gray-700"
                required
              />
            </div>

            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Project preview"
                className="w-40 rounded"
              />
            )}

            {formError && <p className="text-sm text-red-400">{formError}</p>}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(details).map((key) => (
                <input
                  key={key}
                  value={details[key]}
                  placeholder={key}
                  onChange={(e) =>
                    setDetails({ ...details, [key]: e.target.value })
                  }
                  className="p-2 rounded bg-gray-900 border border-gray-700 text-sm"
                />
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              {Object.keys(client).map((key) => (
                <input
                  key={key}
                  value={client[key]}
                  placeholder={key}
                  onChange={(e) =>
                    setClient({ ...client, [key]: e.target.value })
                  }
                  className="p-2 rounded bg-gray-900 border border-gray-700 text-sm"
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-yellow-500 text-black rounded-full disabled:opacity-60"
              >
                {submitting ? "Saving..." : isEditing ? "Update" : "Add"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div ref={scrollRef} className="flex gap-8 overflow-x-auto no-scrollbar">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className="min-w-[280px] md:min-w-[380px] h-[380px] md:h-[480px] rounded-2xl overflow-hidden relative group"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition"></div>

            <div className="absolute bottom-0 p-5 text-white">
              <h3 className="text-lg font-semibold">{project.title}</h3>

              <button
                onClick={() => {
                  setSelectedProject(project);
                  setActiveTab("project");
                }}
                className="text-yellow-400 text-sm"
              >
                View Details -&gt;
              </button>

              {admin && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="bg-blue-500 px-2 py-1 text-xs rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-500 px-2 py-1 text-xs rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-[280px] object-cover"
            />

            <div className="p-6 text-black">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>

              <div className="flex gap-6 mt-4 border-b pb-2">
                <button
                  onClick={() => setActiveTab("project")}
                  className={
                    activeTab === "project" ? "border-b-2 border-black" : ""
                  }
                >
                  Project
                </button>
                <button
                  onClick={() => setActiveTab("client")}
                  className={
                    activeTab === "client" ? "border-b-2 border-black" : ""
                  }
                >
                  Client
                </button>
              </div>

              {activeTab === "project" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {Object.entries(selectedProject.details || {}).map(
                    ([key, value]) => (
                      <div key={key} className="bg-gray-100 p-3 rounded">
                        <p className="text-xs text-gray-500">{key}</p>
                        <p className="font-semibold">{value}</p>
                      </div>
                    )
                  )}
                </div>
              )}

              {activeTab === "client" && (
                <div className="mt-4 space-y-3">
                  {Object.entries(selectedProject.client || {}).map(
                    ([key, value]) => (
                      <div key={key} className="bg-gray-100 p-3 rounded">
                        <p className="text-xs text-gray-500">{key}</p>
                        <p className="font-semibold">{value}</p>
                      </div>
                    )
                  )}
                </div>
              )}

              <button
                onClick={() => setSelectedProject(null)}
                className="mt-6 bg-black text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #facc15;
          color: black;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
}

export default Projects;
