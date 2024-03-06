import { initDbdata } from '../post';

export async function GET(request: Request) {
    const allPostsData = await initDbdata();
    return Response.json({ data: allPostsData })
}