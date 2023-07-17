import { ref } from 'vue'

const getUsers = () => {
    const users = ref([]);
    const error = ref(null);

    const loadUsers = async () => {
        try {
            // Fetch API GET
            let data = await fetch('http://localhost:3000/users');

            console.log("data fetched users");

            // If response not okay
            if (!data.ok) {
                throw Error('Cannot fetch users');
            }

            // Parse JSON data
            const jsonData = await data.json();

            // Map data in the desired format
            users.value = jsonData.map(user => ({
                id: user.id,
                username: user.username,
                password: user.password,
                age: user.age,
                creditCardNo: user.creditCardNo
            }));
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        }
    };

    const authenticateUser = (username, password) => {
        const user = users.value.find(user => user.username === username && user.password === password);
        return user;
    };

    return { users, error, loadUsers, authenticateUser };
};

export default getUsers;
