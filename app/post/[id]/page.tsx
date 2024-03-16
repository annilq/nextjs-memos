import prisma from '@/lib/prisma'
import DateLabel from "../components/Date";
import { CustomMDX } from "../components/mdx-remote";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'memos post',
}

export default async function Page({ params }: { params: { id: string } }) {

  const post = await prisma.post.findFirst({
    where: {
      id: params.id
    }
  })
  return (
    <div className="relative w-full h-auto flex flex-col justify-start items-start px-4 sm:px-6">
      <div className={`group relative flex flex-col justify-start items-start w-full px-4 pt-2 pb-3 mb-2 bg-white dark:bg-zinc-800 rounded-lg border border-white dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700 memos-3`}>
        <article>
          <h1 className="text-4xl font-bold my-4">{post?.title}</h1>
          <div className="text-gray-400">
            <DateLabel date={post?.createdAt!} />
          </div>
          <CustomMDX
            // h1 now renders with `large-text` className
            source={post?.content!}
          />
        </article>
      </div>
    </div>
  )
}