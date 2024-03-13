import prisma from '@/lib/prisma'
import { getAllPostsData } from './util';
import { Post } from '@prisma/client';

export const initDbdata = async () => {

  const users = await prisma.user.findMany({});
  const authorId = users[0]?.id
  const matters = getAllPostsData()
  const postsData: Post[] = matters?.map(matterData => ({
    title: String(matterData.data.title),
    content: matterData.content,
    // categorys: ["unknow"],
    authorId,
    published: true
  })) satisfies Post[]

  const posts = await prisma.post.createMany({
    data: postsData
  });
  
  return await prisma.post.findMany({})
}