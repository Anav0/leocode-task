import { User } from "models/user";

type UserInfoProps = {
  user: User;
};

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <li data-cy="user-info" className="user-info">
      <span className="user-info__name">{user.name}</span>
      <span className="user-info__username">@{user.username}</span>
    </li>
  );
};
