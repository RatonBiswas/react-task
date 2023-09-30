export const getContacts = async () => {
    const res = await fetch("https://contact.mediusware.com/api/contacts/");
  
    const data = await res.json();
  
    return data;
  };
  
  export const getUSContacts = async (name) => {
    const res = await fetch(
      `
      https://contact.mediusware.com/api/country-contacts/${name}/`
    );
  
    const usData = await res.json();
  
    return usData;
  };