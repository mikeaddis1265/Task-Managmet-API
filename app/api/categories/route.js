import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/middleware'
import { categorySchema } from '@/lib/validation'

export async function GET(request) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return Response.json({ categories }, { status: 200 })

  } catch (error) {
    console.error('Get categories error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  const authResult = await verifyToken(request)
  
  if (authResult.error) {
    return Response.json(
      { error: authResult.error },
      { status: authResult.status }
    )
  }

  try {
    const body = await request.json()
    
    const validatedData = categorySchema.parse(body)
    const { name } = validatedData

    const existingCategory = await prisma.category.findUnique({
      where: { name }
    })

    if (existingCategory) {
      return Response.json(
        { error: 'Category with this name already exists' },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: { name }
    })

    return Response.json(
      { 
        message: 'Category created successfully',
        category 
      },
      { status: 201 }
    )

  } catch (error) {
    if (error.name === 'ZodError') {
      return Response.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create category error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}