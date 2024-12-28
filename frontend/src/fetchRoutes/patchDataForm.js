export const patchDataForm = async function patchDataForm(url, data) {
    try {
        const response = await fetch(url, {
            method: "PATCH",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        return response.json();
    } catch (error) {
        throw error; // Re-throw for higher-level handling
    }
};
