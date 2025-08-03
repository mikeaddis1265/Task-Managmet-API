import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/middleware'
import { taskSchema } from '@/lib/validation'

export async function PUT(request, { params }) {
  const authResult = await verifyToken(request)
  
  if (authResult.error) {
    return Response.json(
      { error: authResult.error },
      { status: authResult.status }
    )
  }

  try {
    const { id } = params
    const body = await request.json()
    
    const validatedData = taskSchema.partial().parse(body)
    const { title, description, status, categoryId } = validatedData

    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: authResult.user.id
      }
    })

    if (!existingTask) {
      return Response.json(
        { error: 'Task not found or unauthorized' },
        { status: 404 }
      )
    }

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      })

      if (!category) {
        return Response.json(
          { error: 'Category not found' },
          { status: 404 }
        )
      }
    }

    const updateData = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (status !== undefined) updateData.status = status
    if (categoryId !== undefined) updateData.categoryId = categoryId

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
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
        message: 'Task updated successfully',
        task 
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

    console.error('Update task error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  const authResult = await verifyToken(request)
  
  if (authResult.error) {
    return Response.json(
      { error: authResult.error },
      { status: authResult.status }
    )
  }

  try {
    const { id } = params

    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: authResult.user.id
      }
    })

    if (!existingTask) {
      return Response.json(
        { error: 'Task not found or unauthorized' },
        { status: 404 }
      )
    }

    await prisma.task.delete({
      where: { id }
    })

    return Response.json(
      { message: 'Task deleted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Delete task error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}