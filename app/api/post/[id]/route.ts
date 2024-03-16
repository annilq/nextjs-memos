import prisma from '@/lib/prisma'

export async function GET(request: Request,
    { params }: { params: { id: string } }
) {

    const posts = await prisma.post.findFirst({
        where: {
            id: params.id
        },
        select: {
            title: true,
            createdAt: true,
            id: true
        }
    })
    console.log(posts);

    return Response.json({ data: posts })
}