import { ref } from 'vue'

const getUser = (sessionUserId) => {
  const user = ref(null);
  const error = ref(null);

  const loadUser = async () => {
    try {
      // Fetch API GET
      let data = await fetch(`http://localhost:3000/users/${sessionUserId}`);

      console.log("data fetched user");

      // If response not okay
      if (!data.ok) {
        throw Error('Cannot fetch user');
      }

      // Parse JSON data
      const jsonData = await data.json();

      // Map data in the desired format
      user.value = {
        id: jsonData.id,
        username: jsonData.username,
        password: jsonData.password,
        age: jsonData.age,
        creditCardNo: jsonData.creditCardNo
      };
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return { user, error, loadUser };
};

export default getUser;
