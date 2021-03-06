export const _apiCreateGuests = async (payload, tipe_tamu) => {
    try {
        let response = await fetch(`api/guests/create?tipe_tamu=${tipe_tamu}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            },
        );
        return await response.json();
    } catch (error) {
        return false;
    }
};

export const _apiUpdateGuests = async (_id) => {
    try {
        let response = await fetch(`api/guests/${_id}/update`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        );
        return await response.json();
    } catch (error) {
        return false;
    }
};
