import { useEffect } from "react";
import type { IUser } from "../../types/User.type";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "../../services/graphql/queries";
import { DELETE_USER } from "../../services/graphql/mutations";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const { data, loading, error } = useQuery<{ users: { data: IUser[] } }>(
    GET_USERS
  );
  const [deleteUserMutation] = useMutation(DELETE_USER);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserMutation({
          variables: { id },
          refetchQueries: [{ query: GET_USERS }],
        });
      } catch (err) {
        alert("Error deleting user");
        return err;
      }
    }
  };

  if (loading)
    return <div className="text-center text-lg mt-8">Loading users...</div>;
  if (error)
    return (
      <div className="text-center text-red-600 text-lg mt-8">
        Error: {error.message}
      </div>
    );

  const users = data?.users.data || [];

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Users List</h2>
      <Link
        to="/users/new"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6 inline-block"
      >
        Create New User
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2 text-purple-700">
              {user.name}
            </h3>
            <p className="text-gray-600 text-sm mb-1">@{user.username}</p>
            <p className="text-gray-600 text-sm mb-4">{user.email}</p>
            <div className="flex space-x-3">
              <Link
                to={`/users/${user.id}`}
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                View
              </Link>
              <Link
                to={`/users/edit/${user.id}`}
                className="text-yellow-500 hover:text-yellow-700 font-medium"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
