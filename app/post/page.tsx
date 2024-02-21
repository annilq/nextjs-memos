import Link from "next/link";
import DateLabel from "./components/Date";
import { getSortedPostsData } from "../api/post/util";

export default function Post() {
  const data = getSortedPostsData();  
  return (
    <section className={`container mx-auto`}>
      <h2 className="text-2xl">Blog</h2>
      <ul>
        {data?.map(({ id, date, title }) => (
          <li className="mb-4" key={id}>
            <Link legacyBehavior href={`/post/${id}`}>
              {title}
            </Link>
            <br />
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
