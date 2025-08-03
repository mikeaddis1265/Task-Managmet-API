import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

export async function verifyToken(request) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: 'No token provided', status: 401 }
    }

    const token = authHeader.split(' ')[1]
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true }
    })

    if (!user) {
      return { error: 'User not found', status: 401 }
    }

    return { user }
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return { error: 'Invalid token', status: 401 }
    }
    if (error.name === 'TokenExpiredError') {
      return { error: 'Token expired', status: 401 }
    }
    return { error: 'Authentication failed', status: 401 }
  }
}

export function generateToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}