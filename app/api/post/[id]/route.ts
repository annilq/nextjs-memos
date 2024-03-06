import { getPostData, getAllPostsMetaData } from "../util";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')!
    const data = await getPostData(id)
    return Response.json({ data })
}