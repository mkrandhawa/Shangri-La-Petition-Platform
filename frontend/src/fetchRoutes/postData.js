export const postData = async function postData(url, user) {
    try {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(user),
        });
    
        if (!response.ok) { 
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong');
        }
    
        return response.json();
      } catch (error) {
        console.error('Error:', error);
        throw error; 
      }

    }