import { getPostData } from "@/app/api/post/util";
import Head from "next/head";
import DateLabel from "../components/Date";
import "./style.css";

export default async function Page({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id)

  return (
    <div className="container mx-auto">
      <Head>
        <title>{postData.title}</title>
      </Head>
      <br />
      <article>
        <h1 className="text-4xl font-bold my-4">{postData.title}</h1>
        <div className="text-gray-400">
          <DateLabel dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  )
}