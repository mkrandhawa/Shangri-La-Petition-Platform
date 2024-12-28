export const postDataForm = async function postData(url, formData) {
    try {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: formData,        
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