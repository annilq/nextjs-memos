import Link from "next/link";
import DateLabel from "./components/Date";
import { getSortedPostsData } from "../api/post/util";

export default function Post() {
  const data = getSortedPostsData();
  return (
    <section className={`container p-6 bg-white`}>
      <h2 className="text-2xl font-bold">Blog</h2>
      <ul className="mt-4 space-y-6">
        {data?.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/post/${id}`} className="text-blue-500 hover:underline block text-xl">
              {title}
            </Link>
            {date && (
              <small className="text-sm text-gray-500">
                <DateLabel date={date} />
              </small>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
