import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { loginSchema } from '@/lib/validation'
import { generateToken } from '@/lib/middleware'

export async function POST(request) {
  try {
    const body = await request.json()
    
    const validatedData = loginSchema.parse(body)
    const { email, password } = validatedData

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      {expiresIn: '7d'}
    )

    return Response.json(
      { 
        message: 'Login successful',
        user : {name: user.name, Id: user.id},
        token
      },
      { status: 200 }
    )

  } catch (error) {
    if (error.name === 'ZodError') {
      return Response.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Login error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}