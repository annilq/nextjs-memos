import { getPostData } from "@/app/api/post/util";
import Head from "next/head";
import DateLabel from "../components/Date";
import { CustomMDX } from "../components/mdx-remote";

export default async function Page({ params }: { params: { id: string } }) {

  const { source, title, date } = await getPostData(params.id)

  return (
    <div className="container mx-auto">
      <Head>
        <title>{title}</title>
      </Head>
      <br />
      <article>
        <h1 className="text-4xl font-bold my-4">{title}</h1>
        <div className="text-gray-400">
          <DateLabel date={date} />
        </div>
        <CustomMDX
          // h1 now renders with `large-text` className
          source={source}
        />
      </article>
    </div>
  )
}