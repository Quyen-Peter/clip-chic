import { jwtDecode } from 'jwt-decode';

export const getToken = (): string | null => {
  return sessionStorage.getItem('token');
};

export const getUserIdFromToken = (): number | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    const userId = decoded.sub || decoded.userId || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    return userId ? parseInt(userId, 10) : null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const logout = (): void => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('isLoggedIn');
};
