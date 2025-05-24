import { sign } from 'jsonwebtoken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const JWT_SECRET = process.env.JWT_SECRET!;

interface LoginParams {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'manager';
  };
}

export async function login({
  email,
  password,
}: LoginParams): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  const data = await response.json();

  // Gerar token JWT
  const token = sign(
    {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role,
    },
    JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );

  return {
    token,
    user: data.user,
  };
}

export async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/auth/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function changePassword(
  token: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const response = await fetch(`${API_URL}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to change password');
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  const response = await fetch(`${API_URL}/auth/request-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to request password reset');
  }
}

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<void> {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
      newPassword,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to reset password');
  }
} 