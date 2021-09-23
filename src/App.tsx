import api from "api";
import { Spinner } from "components/spinner";
import { UserInfo } from "components/user-info";
import { User } from "models/user";
import React, { useEffect, useState } from "react";
import "styles/pages/App.scss";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setTimeout(async () => {
          const { data: users } = await api.users.all();
          setUsers(users);
          setDisplayedUsers(users);
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const filterUsers = () => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    if (normalizedSearchTerm === "") {
      setDisplayedUsers(users);
      return;
    }

    const filteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(normalizedSearchTerm) ||
        user.username.toLowerCase().includes(normalizedSearchTerm)
      );
    });
    setDisplayedUsers(filteredUsers);
  };

  useEffect(() => {
    filterUsers();
  }, [searchTerm]);

  const usersList = displayedUsers.map((user) => <UserInfo key={user.id} user={user} />);

  const content = users.length > 0 ? <ul className="App__user-list">{usersList}</ul> : <Spinner />;

  return (
    <div className="App">
      <div className="App__content">
        <h1 className="App__header">Users list</h1>
        <input
          className="base-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search by user name..."
        />
        {content}
        {displayedUsers.length === 0 && users.length > 0 && (
          <span className="App__info">No user with given name was found</span>
        )}
      </div>
    </div>
  );
}

export default App;
