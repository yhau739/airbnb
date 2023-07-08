import { ref } from 'vue'

const deleteListing = (id) => {
  const delError = ref(null)

  const deleteListingByID = async () => {
    try {
      // Send a DELETE request to delete the listing
      let response = await fetch(`http://localhost:3000/listings/${id}`, {
        method: 'DELETE'
      })

      // Check if the response is not okay
      if (!response.ok) {
        throw Error('Failed to delete listing')
      }
    } catch (err) {
        delError.value = err.message
      console.log(delError.value)
    }
  }

  return { delError, deleteListingByID }
}

export default deleteListing
