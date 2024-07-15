import { User } from "../../types/user";

type Props = {
  users: User[];
};

export const UserList: React.FC<Props> = (props: Props) => {
  return (
    <ul>
      {props.users.map((user, index) => (
        <li key={index} className="border-b border-gray-200 flex flex-col py-4">
          <label>
            <strong>ID: </strong>
            {user.id}
          </label>
          <label>
            <strong>Name: </strong>
            {user.name}
          </label>
          <label>
            <strong>Email: </strong>
            {user.email}
          </label>
          <label>
            <strong>Role: </strong>
            {user.role}
          </label>
        </li>
      ))}
    </ul>
  );
};
