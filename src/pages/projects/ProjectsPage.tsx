import { useEffect, useState } from "react";
import { deleteProject, getProjects } from "../../services/Project.service";
import type { IProject } from "../../types/Project.type";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let controller = null;
    if (!controller) {
      controller = new AbortController();
    }

    const fetchProjects = async () => {
      try {
        const data = await getProjects(controller.signal);
        setProjects(data);
      } catch (err) {
        if (err instanceof AxiosError && err.code !== "ERR_CANCELED") {
          setError("Failed to fetch projects");
        }
        setProjects([]);
        return err;
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();

    return () => {
      if (controller) {
        controller.abort();
      }
      console.log("Cleanup: Aborted fetch request");
    };
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const controller = new AbortController();
        await deleteProject(id, controller.signal);
        setProjects((prevState) =>
          prevState.filter((project) => project.id !== id)
        );
      } catch (err) {
        alert("Failed to delete project");
        return err;
      }
    }
  };

  if (isLoading)
    return <div className="text-center text-lg mt-8">Loading projects...</div>;
  if (error)
    return <div className="text-center text-red-600 text-lg mt-8">{error}</div>;

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-600">Projects List</h2>
      <Link
        to="/projects/create"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mb-6 inline-block"
      >
        Create New Project
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!!projects &&
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-left font-semibold mb-2 text-blue-700">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {project.body}
              </p>
              <div className="flex space-x-3">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  View
                </Link>
                <Link
                  to={`/projects/edit/${project.id}`}
                  className="text-yellow-500 hover:text-yellow-700 font-medium"
                >
                  Edit
                </Link>
                <button onClick={() => handleDelete(project.id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
