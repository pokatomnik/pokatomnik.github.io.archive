export const credentialsToBase64 = ({email, password}) => btoa(`${email}:${password}`);

export const base64ToCredentials = (base64String) => {
    const [email, password] = atob(base64String).split(':');
    return {email, password};
};