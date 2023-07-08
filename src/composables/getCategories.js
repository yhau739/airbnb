import { ref } from 'vue'

const getCategories = () => {
    const categories = ref([])
    const errorCategories = ref(null)

    const loadCategories = async () => {
        try {
            // fetch api GET
            let data = await fetch('http://localhost:3000/categories')

            // if response not okay
            if (!data.ok) {
                // this error will be catched
                throw Error('can not fetch categories')
            }

            // parse JSON data
            const jsonData = await data.json();

            // map data in desired format
            categories.value = jsonData.map(category => ({
                type: category.type,
                icon: require('@/' + category.icon),
                isActive: category.isActive
            }))
        }
        catch (err) {
            errorCategories.value = err.message;
            console.log(errorCategories.value)
        }
    }

    return { categories, errorCategories, loadCategories }
}

export default getCategories