import { ref } from 'vue'

const getListings = () => {
    const listings = ref([])
    const error = ref(null)

    const loadListings = async () => {
        try {
            // fetch api GET
            let data = await fetch('http://localhost:3000/listings')

            // if response not okay
            if (!data.ok) {
                // this error will be catched
                throw Error('can not fetch listings')
            }

            // parse JSON data
            const jsonData = await data.json();

            // map data in desired format
            listings.value = jsonData.map(listing => ({
                id: listing.id,
                title: listing.title,
                type: listing.type,
                // if path then use @, else base64 directly save
                imageSrc: listing.imageSrc.startsWith('data:image/jpeg;base64') || listing.imageSrc.startsWith('data:image/png;base64')
                    ? listing.imageSrc
                    : require('@/' + listing.imageSrc),
                rent: listing.rent,
                description: listing.description,
                isAvailable: Boolean(listing.isAvailable)
            }))
        }
        catch (err) {
            error.value = err.message;
            console.log(error.value)
        }
    }

    return { listings, error, loadListings }
}

export default getListings