import { fetchUsers, filterUsers } from "App.code";
import { Spinner } from "components/spinner";
import { UserInfo } from "components/user-info";
import { User } from "models/user";
import React, { useEffect, useRef, useState } from "react";
import "styles/pages/App.scss";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    fetchUsers(setUsers, setDisplayedUsers, setError);
  }, []);

  useEffect(() => {
    filterUsers(searchTerm, users, setDisplayedUsers);
  }, [searchTerm]);

  useEffect(() => {
    inputRef.current.focus();
  }, [users]);

  const usersList = displayedUsers.map((user) => <UserInfo key={user.id} user={user} />);
  const content =
    users.length > 0 ? (
      <ul data-cy="users-list" className="App__user-list">
        {usersList}
      </ul>
    ) : (
      <Spinner />
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
        {error === null && content}
        {displayedUsers.length === 0 && users.length > 0 && error === null && (
          <span data-cy="info" className="App__info">
            No user with given name was found
          </span>
        )}
        {error != null && (
          <span data-cy="error" className="App__error">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default App;
