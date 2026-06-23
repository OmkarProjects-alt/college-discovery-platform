import { prisma } from "@/lib/prisma";
import { api } from '@/lib/axios';

export async function register(data: {
    name: string,
    email: string,
    password: string,
}) {

    const result = await api.post('/auth/register',
        data,
    );

    return result.data;
}

export async function login(data: {
    email: string,
    password: string,
}) {
    const result = await api.post('/auth/login',
        data
    )

    return result.data;
}

export async function getCurrentUser() {
  const res = await fetch("/api/auth/me");

  return await res.json();
}