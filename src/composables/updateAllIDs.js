import { ref } from 'vue';

const updateAllIDs = async () => {
    try {
        // Fetch the JSON data from your database
        const response = await fetch('http://localhost:3000/listings');
        const jsonData = await response.json();

        var index = 0;

        // Update the ID for each object
        jsonData.forEach((obj) => {
            const id = obj.id; // Get the current ID
            const newId = index + 1;

            const updatedObj = {
                id: newId,
                title: obj.title,
                type: obj.type,
                imageSrc: obj.imageSrc,
                rent: obj.rent,
                description: obj.description,
                isAvailable: obj.isAvailable
            };

            // Send a PUT request to update the individual object's ID
            fetch(`http://localhost:3000/listings/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedObj)
            })
                .then(() => {
                    console.log(`ID ${id} updated to ${newId}`);
                })
                .catch((error) => {
                    console.error(`Error updating ID ${id}:`, error);
                });

            index += 1;
        });

        console.log('IDs updated successfully!');
    } catch (error) {
        console.error('Error updating IDs:', error);
    }
};

export default updateAllIDs;
