import api from "api";
import { User } from "models/user";

export const filterUsers = (searchTerm: string, users: User[], setFilteredUsers: any) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (normalizedSearchTerm === "") {
        setFilteredUsers(users)
        return
    }

    // INFO: using some fuzzy search may be a good idea
    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(normalizedSearchTerm) ||
            user.username.toLowerCase().includes(normalizedSearchTerm)
        );
    });
    setFilteredUsers(filteredUsers)
};

export const fetchUsers = async (setUsers: any, setDisplayedUsers: any, setError: any) => {
    // INFO: this timeout is here only to showcase how would application behave on slow connection
    // Another way of simulating slow connection is browser dev tools
    setTimeout(async () => {
        try {
            const { data: users } = await api.users.all();
            setUsers(users)
            setDisplayedUsers(users)
        } catch (error) {
            setError(error)
        }
    }, 1000);
};