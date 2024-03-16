import prisma from '@/lib/prisma'
import Link from "next/link";
import DateLabel from "./components/Date";

export default async function Post() {

  const data = await prisma.post.findMany({});

  return (
    <div className="relative w-full h-auto flex flex-col justify-start items-start px-4 sm:px-6">
      <div className={`group relative flex flex-col justify-start items-start w-full px-4 pt-2 pb-3 mb-2 bg-white dark:bg-zinc-800 rounded-lg border border-white dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700 memos-3`}>
        <h2 className="text-2xl font-bold">Blog</h2>
        <ul className="mt-4 space-y-6">
          {data?.map(({ id, createdAt, title }) => (
            <li key={id}>
              <Link href={`/post/${id}`} className="text-blue-500 hover:underline block text-xl">
                {title}
              </Link>
              <small className="text-sm text-gray-500">
                <DateLabel date={createdAt} />
              </small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
