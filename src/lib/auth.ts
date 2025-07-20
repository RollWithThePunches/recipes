import bcrypt from 'bcryptjs'
import { prisma } from './db'

export interface CreateUserData {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
}

export interface LoginData {
  username: string
  password: string
}

export interface UserWithoutPassword {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  createdAt: Date
  updatedAt: Date
  avatar?: string | null
  bio?: string | null
  isActive: boolean
}

// Hash password with bcrypt
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

// Compare password with hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Create a new user
export async function createUser(userData: CreateUserData): Promise<UserWithoutPassword> {
  const { email, username, firstName, lastName, password } = userData

  console.log('createUser called with:', { email, username, firstName, lastName })

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username }
      ]
    }
  })

  if (existingUser) {
    console.log('User already exists:', existingUser.email)
    throw new Error('User with this email or username already exists')
  }

  // Hash the password
  const hashedPassword = await hashPassword(password)

  // Create the user
  console.log('Creating user in database...')
  const user = await prisma.user.create({
    data: {
      email,
      username,
      firstName,
      lastName,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
      avatar: true,
      bio: true,
      isActive: true,
    }
  })

  console.log('User created in database:', user.id, user.email)
  return user
}

// Authenticate user login
export async function authenticateUser(loginData: LoginData): Promise<UserWithoutPassword | null> {
  const { username, password } = loginData

  // Find user by username or email
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email: username }
      ],
      isActive: true
    }
  })

  if (!user) {
    return null
  }

  // Verify password
  const isValidPassword = await comparePassword(password, user.password)
  if (!isValidPassword) {
    return null
  }

  // Return user without password
  const userWithoutPassword = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    avatar: user.avatar,
    bio: user.bio,
    isActive: user.isActive,
  }
  return userWithoutPassword
}

// Get user by ID
export async function getUserById(id: string): Promise<UserWithoutPassword | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
      avatar: true,
      bio: true,
      isActive: true,
    }
  })

  return user
}

// Update user profile
export async function updateUserProfile(
  id: string, 
  data: Partial<Pick<UserWithoutPassword, 'firstName' | 'lastName' | 'avatar' | 'bio'>>
): Promise<UserWithoutPassword | null> {
  const user = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
      avatar: true,
      bio: true,
      isActive: true,
    }
  })

  return user
}

// Change password
export async function changePassword(id: string, currentPassword: string, newPassword: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id }
  })

  if (!user) {
    return false
  }

  // Verify current password
  const isValidCurrentPassword = await comparePassword(currentPassword, user.password)
  if (!isValidCurrentPassword) {
    return false
  }

  // Hash new password
  const hashedNewPassword = await hashPassword(newPassword)

  // Update password
  await prisma.user.update({
    where: { id },
    data: { password: hashedNewPassword }
  })

  return true
} 