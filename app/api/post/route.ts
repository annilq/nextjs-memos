import prisma from '@/lib/prisma'

export async function GET(request: Request) {

    const posts = await prisma.post.findMany({
        select: {
            title: true,
            createdAt: true,
            id: true
        }
    })
        
    return Response.json({ data: posts })
}