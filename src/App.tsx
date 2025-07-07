import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header } from "./components";
import Home from "./pages/Home";
import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/apollo.util";

const ProjectsPage = lazy(() => import("./pages/projects/ProjectsPage"));
const ProjectDetailsPage = lazy(
  () => import("./pages/projects/ProjectDetailsPage")
);
const CreateProjectPage = lazy(
  () => import("./pages/projects/CreateProjectPage")
);
const EditProjectPage = lazy(() => import("./pages/projects/EditProjectPage"));

const UsersPage = lazy(() => import("./pages/users/UsersPage"));
const UserDetailsPage = lazy(() => import("./pages/users/UserDetailsPage"));
const CreateUserPage = lazy(() => import("./pages/users/CreateUserPage"));
const EditUserPage = lazy(() => import("./pages/users/EditUserPage"));

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="min-h-screen bg-gray-100 p-4">
          <Header />
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                <p className="ml-4 text-lg text-gray-700">Loading section...</p>
              </div>
            }
          >
            <Routes>
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailsPage />} />
              <Route path="/projects/create" element={<CreateProjectPage />} />
              <Route path="/projects/edit/:id" element={<EditProjectPage />} />

              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<UserDetailsPage />} />
              <Route path="/users/create" element={<CreateUserPage />} />
              <Route path="/users/edit/:id" element={<EditUserPage />} />

              <Route path="/" element={<Home />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
