import { ref } from 'vue'

const getListingById = (listingID) => {
    const listing = ref(null)
    const error = ref(null)
    console.log(listingID);

    const loadListing = async () => {
        try {
            // fetch api GET
            let data = await fetch('http://localhost:3000/listings/' + listingID)

            // if response not okay
            if (!data.ok) {
                // this error will be catched
                throw Error('can not fetch listing')
            }

            // parse JSON data
            const jsonData = await data.json();

            // map data in desired format
            listing.value = {
                id: jsonData.id,
                title: jsonData.title,
                type: jsonData.type,
                // if path then use @, else base64 directly save
                imageSrc: jsonData.imageSrc.startsWith('data:image/jpeg;base64') || jsonData.imageSrc.startsWith('data:image/png;base64')
                    ? jsonData.imageSrc
                    : require('@/' + jsonData.imageSrc),
                rent: jsonData.rent,
                description: jsonData.description,
                isAvailable: Boolean(jsonData.isAvailable)
            };
        }
        catch (err) {
            error.value = err.message;
            console.log(error.value)
        }
    }

    return { listing, error, loadListing }
}

export default getListingById