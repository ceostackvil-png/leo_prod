import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('leo_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState('login'); // 'login', 'otp', 'signup'
  const [phoneOrEmail, setPhoneOrEmail] = useState('');

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('leo_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('leo_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const loginWithPhone = (input) => {
    setPhoneOrEmail(input);
    setAuthStep('otp');
  };

  const verifyOtp = (otp) => {
    // Simulated OTP verification
    const newUser = {
      id: `usr_${Date.now()}`,
      name: phoneOrEmail.includes('@') ? phoneOrEmail.split('@')[0] : 'LEO Shopper',
      phone: !phoneOrEmail.includes('@') ? phoneOrEmail : '9876543210',
      email: phoneOrEmail.includes('@') ? phoneOrEmail : 'member@leo.com',
      isAdmin: false,
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      addresses: [
        {
          id: 'addr-1',
          name: 'Home',
          fullName: 'LEO Shopper',
          addressLine: 'Flat 402, Oakwood Residency, Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
          phone: '9876543210',
          isDefault: true
        }
      ]
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    setAuthStep('login');
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleAdmin = () => {
    if (user) {
      setUser(prev => ({ ...prev, isAdmin: !prev.isAdmin }));
    } else {
      setUser({
        id: 'admin_1',
        name: 'LEO Store Admin',
        email: 'admin@leo.com',
        phone: '9999999999',
        isAdmin: true,
        joinedAt: 'Jan 2026',
        addresses: []
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authStep,
        setAuthStep,
        phoneOrEmail,
        setPhoneOrEmail,
        loginWithPhone,
        verifyOtp,
        logout,
        toggleAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
