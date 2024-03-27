import { useJwt } from "react-jwt";

export const saveTokenToCookie = (token: string) => {
    document.cookie = `token=${token}`;
};

export const getTokenFromCookie = () => {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
    if (tokenCookie) {
        return tokenCookie.split('=')[1];
    }
    return null;
};

export const deleteCookie = () => {
    document.cookie = `token=`;
}

