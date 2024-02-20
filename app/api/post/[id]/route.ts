import { getSortedPostsData } from "../util";

export async function GET(request: Request) {
    console.log(request);
    
    const allPostsData = getSortedPostsData();
    return Response.json({ data: allPostsData })
}