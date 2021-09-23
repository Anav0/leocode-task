import { User } from "models/user";
import "styles/components/user-info.scss";

type UserInfoProps = {
  user: User;
};

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <li className="user-info">
      <span className="user-info__name">{user.name}</span>
      <span className="user-info__username">@{user.username}</span>
    </li>
  );
};
