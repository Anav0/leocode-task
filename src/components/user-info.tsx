import { User } from "models/user";
import "styles/components/user-info.scss";

type UserInfoProps = {
  user: User;
  index: number;
};

export const UserInfo = ({ index, user }: UserInfoProps) => {
  return (
    <li className="user-info" key={user.id}>
      {/* <span>{index + 1}</span> */}
      <span className="user-info__name">{user.name}</span>
      <span className="user-info__username">@{user.username}</span>
    </li>
  );
};
