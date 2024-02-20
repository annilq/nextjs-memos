import Link from "next/link";
import DateLabel from "./components/Date";
import { getSortedPostsData } from "../api/post/util";

export default function Home() {
  const data = getSortedPostsData();
  // console.log(data);
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
                <DateLabel dateString={date} />
              </small>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
