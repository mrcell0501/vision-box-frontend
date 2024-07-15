import { useEffect, useState } from "react";
import { User, UserRole } from "../../types/user";
import { FormModal } from "./FormModal";
import { CreateUser } from "../../types/create-user";
import * as usersApi from "../../api/users-api";

type Props = {
  open: boolean;
  onClose: () => void;
  onUserCreated: (user: User) => void;
};

const formDefaultValues: CreateUser = {
  name: "",
  email: "",
  role: UserRole.DEVELOPER,
};

export const NewUserFormModal: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState<CreateUser>(formDefaultValues);

  const onFieldChange = (key: keyof CreateUser, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    const response = await usersApi.createUser(formData);
    props.onUserCreated(response);
  };

  useEffect(() => {
    setFormData(formDefaultValues);
  }, [props.open]);

  return (
    <FormModal open={props.open} onClose={props.onClose} title="Create User">
      <form
        className="p-4 md:p-5 grid grid-cols-2 gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="col-span-2">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            className="form-input"
            placeholder="Type user name"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="form-label">Email</label>
          <input
            type="email"
            onChange={(e) => onFieldChange("email", e.target.value)}
            value={formData.email}
            className="form-input"
            placeholder="Type user email"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="form-label">Role</label>
          <select
            value={formData.role}
            onChange={(e) => onFieldChange("role", e.target.value)}
            className="form-input"
          >
            <option value={UserRole.DEVELOPER}>Developer</option>
            <option value={UserRole.ADMIN}>Admin</option>
          </select>
        </div>

        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="btn-primary text-white inline-flex items-center"
          >
            <svg
              className="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Add new user
          </button>
        </div>
      </form>
    </FormModal>
  );
};
