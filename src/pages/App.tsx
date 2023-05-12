import { fetchUsers, filterUsers } from "pages/App.code";
import { Spinner } from "components/spinner";
import { UserInfo } from "components/user-info";
import { User } from "models/user";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    fetchUsers(setUsers, setFilteredUsers, setError);
  }, []);

  useEffect(() => {
    filterUsers(searchTerm, users, setFilteredUsers);
  }, [searchTerm, users]);

  useEffect(() => {
    inputRef.current.focus();
  }, [users]);

  const usersInfo = filteredUsers.map((user: User) => <UserInfo key={user.id} user={user} />);

  const usersList = (
    <ul data-cy="users-list" className="App__user-list">
      {usersInfo}
    </ul>
  );

  const errorTag = (
    <span data-cy="error" className="App__error">
      {error?.message}
    </span>
  );

  const infoTag = (
    <span data-cy="info" className="App__info">
      No user with given name was found
    </span>
  );

  return (
    <div className="App">
      <div className="App__content">
        <h1 className="App__header">Users list</h1>
        <input
          data-cy="searchBox"
          ref={inputRef}
          disabled={users.length === 0}
          name="search-input"
          className="base-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search by user's name..."
        />
        {error === null && users.length > 0 && usersList}
        {error != null && errorTag}
        {users.length === 0 && error === null && <Spinner />}
        {filteredUsers.length === 0 && users.length > 0 && error === null && infoTag}
      </div>
    </div>
  );
}

export default App;