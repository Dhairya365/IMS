import { account, ID } from './appwrite';
import { Models } from 'appwrite';

export interface User {
  id: string;
  email: string;
  name: string;
  role?: 'admin' | 'client';
  prefs?: Record<string, any>;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export class AuthService {
  private static instance: AuthService;
  private listeners: ((state: AuthState) => void)[] = [];
  private state: AuthState = {
    user: null,
    loading: true,
    error: null,
  };

  private constructor() {
    this.initializeAuth();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async initializeAuth() {
    try {
      const user = await this.getCurrentUser();
      this.updateState({ user, loading: false, error: null });
    } catch (error) {
      this.updateState({ user: null, loading: false, error: null });
    }
  }

  private updateState(newState: Partial<AuthState>) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener(this.state));
  }

  public subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public getState(): AuthState {
    return this.state;
  }

  public async getCurrentUser(): Promise<User | null> {
    try {
      const user = await account.get();
      return {
        id: user.$id,
        email: user.email,
        name: user.name || '',
        role: user.prefs?.role || 'client', // Default to client role
        prefs: user.prefs,
      };
    } catch (error) {
      return null;
    }
  }

  public async login(email: string, password: string): Promise<User> {
    try {
      this.updateState({ loading: true, error: null });
      
      const session = await account.createEmailPasswordSession(email, password);
      
      if (session) {
        const user = await this.getCurrentUser();
        if (user) {
          this.updateState({ user, loading: false, error: null });
          return user;
        }
      }
      
      throw new Error('Login failed');
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed. Please check your credentials.';
      this.updateState({ user: null, loading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  }

  public async register(email: string, password: string, name: string): Promise<User> {
    try {
      this.updateState({ loading: true, error: null });
      
      const user = await account.create(ID.unique(), email, password, name);
      
      if (user) {
        // Auto-login after registration
        await this.login(email, password);
        const currentUser = await this.getCurrentUser();
        if (currentUser) {
          return currentUser;
        }
      }
      
      throw new Error('Registration failed');
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      this.updateState({ user: null, loading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  }

  public async logout(): Promise<void> {
    try {
      await account.deleteSession('current');
      this.updateState({ user: null, loading: false, error: null });
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear the state even if logout fails
      this.updateState({ user: null, loading: false, error: null });
    }
  }

  public async getJWT(): Promise<string | null> {
    try {
      const jwt = await account.createJWT();
      return jwt.jwt;
    } catch (error) {
      console.error('Error getting JWT:', error);
      return null;
    }
  }
}

export const authService = AuthService.getInstance();
