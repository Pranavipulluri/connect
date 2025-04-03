import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client'; // Adjusted import
import { useToast } from '../hooks/use-toast'; // Adjusted import
import axios from 'axios'; // Import axios for API calls

type AuthContextProps = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string, region?: string) => Promise<void>;
  signOut: () => Promise<void>;
  isDemoMode: boolean;
  enterDemoMode: (region?: string) => void; // Ensure this is defined
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Existing code for checking demo mode and session
  }, [isDemoMode]);

  const signIn = async (username: string, password: string) => {
    // Existing signIn code
  };

  const signUp = async (username: string, password: string, region?: string) => {
    // Existing signUp code
  };

  const signOut = async () => {
    // Existing signOut code
  };

  const enterDemoMode = (region?: string) => {
    localStorage.setItem('culturalQuestDemoMode', 'true');
    localStorage.setItem('demoUserRegion', region || 'Global');
    setIsDemoMode(true);
    
    toast({
      title: "Demo Mode Activated",
      description: `You're now exploring CulturalQuest in Demo Mode. Region: ${region || 'Global'}`,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isDemoMode,
        enterDemoMode, // Include the function in the context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
