import { ref } from 'vue'

const updateListing = () => {
    
    const testMethod = async () => {
        console.log("I am updating listing");
    }
    return { testMethod };
}

export default updateListing;