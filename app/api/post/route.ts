import { getSortedPostsData } from "./util";

export async function GET(request: Request) {
    const allPostsData = getSortedPostsData();
    return Response.json({ data: allPostsData })
}