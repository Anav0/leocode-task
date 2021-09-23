import api from "api";
import { UserInfo } from "components/user-info";
import { User } from "models/user";
import React, { useEffect, useState } from "react";
import "styles/pages/App.scss";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: users } = await api.users.all();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const usersList = users.map((user, i) => <UserInfo index={i} user={user} />);

  return (
    <div className="App">
      <div className="App__content">
        <h1 className="App__header">Users list</h1>
        <input
          className="base-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value.trim());
          }}
          placeholder="Search by user name..."
        />
        <ul className="App__user-list">{usersList}</ul>
      </div>
    </div>
  );
}

export default App;
