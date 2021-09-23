import api from "api";
import { User } from "models/user";

export const filterUsers = (searchTerm: string, users: User[], setFilteredUsers: any) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    if (normalizedSearchTerm === "") {
        setFilteredUsers(users)
        return
    }

    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(normalizedSearchTerm) ||
            user.username.toLowerCase().includes(normalizedSearchTerm)
        );
    });
    setFilteredUsers(filteredUsers)
};

export const fetchUsers = async (setUsers: any, setDisplayedUsers: any, setError: any) => {
    setTimeout(async () => {
        try {
            const { data: users } = await api.users.all();
            setUsers(users)
            setDisplayedUsers(users)
        } catch (error) {
            setError(error)
        }
    }, 2000);
};