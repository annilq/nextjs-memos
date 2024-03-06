import { getAllPostsMetaData } from "./util";

export async function GET(request: Request) {
    const allPostsData = getAllPostsMetaData();
    return Response.json({ data: allPostsData })
}