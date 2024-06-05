import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth/AuthContext';

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;