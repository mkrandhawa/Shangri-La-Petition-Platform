export const getData = async function getData(url) {
    try {
        const response = await fetch(url, {
            mode: "cors",
            credentials: "include",
            referrerPolicy: "no-referrer",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};