const getBookingsByUserId = (userId) => {
    const bookings = ref([]);
    const error = ref(null);

    const loadBookings = async () => {
        try {
            // Fetch API GET
            let data = await fetch(`http://localhost:3000/bookings?userId=${userId}`);

            // If response not okay
            if (!data.ok) {
                throw Error('Cannot fetch bookings');
            }

            // Parse JSON data
            const jsonData = await data.json();

            // Filter bookings based on userId
            const userBookings = jsonData.filter(booking => booking.userId === userId);

            // Map data in the desired format
            bookings.value = userBookings.map(booking => ({
                id: booking.id,
                userId: booking.userId,
                startDate: booking.startDate,
                duration: booking.duration,
                endDate: booking.endDate
            }));
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        }
    };

    return { bookings, error, loadBookings };
};

export default getBookingsByUserId;
