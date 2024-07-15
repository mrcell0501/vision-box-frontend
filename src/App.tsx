import { useEffect, useState } from "react";
import { UserList } from "./components/list/UserList";
import { User } from "./types/user";
import { NewUserFormModal } from "./components/modal/NewUserFormModal";
import * as usersApi from "./api/users-api";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);

  const onUserCreated = (createdUser: User) => {
    setUsers([createdUser, ...users]);
    setShowModal(false);
  };

  const getUsers = async () => {
    const response = await usersApi.getUsers();
    setUsers(response);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="container mx-auto my-10">
      <h1 className="text-center text-3xl font-semibold mb-4">User List</h1>
      <div className="md:w-2/3 mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-end mb-4">
            <button
              className="btn-primary"
              onClick={() => setShowModal(true)}
              disabled={showModal}
            >
              Add
            </button>
          </div>
          <UserList users={users} />
        </div>
      </div>
      <NewUserFormModal
        open={showModal}
        onUserCreated={onUserCreated}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
}
