import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/middleware'
import { taskSchema } from '@/lib/validation'

export async function GET(request) {
  const authResult = await verifyToken(request)
  
  if (authResult.error) {
    return Response.json(
      { error: authResult.error },
      { status: authResult.status }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')

    const whereClause = {
      userId: authResult.user.id
    }

    if (category) {
      whereClause.category = {
        name: category
      }
    }

    if (status) {
      whereClause.status = status.toUpperCase()
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return Response.json({ tasks }, { status: 200 })

  } catch (error) {
    console.error('Get tasks error:', error)
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
    
    const validatedData = taskSchema.parse(body)
    const { title, description, status, categoryId } = validatedData

    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return Response.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'PENDING',
        userId: authResult.user.id,
        categoryId
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return Response.json(
      { 
        message: 'Task created successfully',
        task 
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

    console.error('Create task error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}