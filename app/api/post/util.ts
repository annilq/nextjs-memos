import fs from "fs";
import path from "path";
import matter from "gray-matter";
// next mdx 
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from "rehype-pretty-code";

export interface PostMeta {
  id: string
  title: string
  date: string
}

export interface Post extends PostMeta {
  contentHtml: string | TrustedHTML
}

const postsDirectory = path.join(process.cwd(), "app", "api", "post", "asserts");

function getPostMeta(dir: string, fileName: string): PostMeta {
  const id = fileName.replace(/\.mdx$/, "");

  // Read markdown file as string
  const fullPath = path.join(dir, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, { delimiters: "---" });

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
    title: matterResult.data.title,
    // format to string ,or will pinic
    date: matterResult.data.date.toISOString(),
  };
}

function getPostsFromDir(dir: string) {
  // Get file names under /posts
  const files: { dir: string, fileName: string }[] = [];
  const fileNames = fs.readdirSync(dir);
  fileNames?.map((fileName) => {
    if (fileName.indexOf("mdx") > -1) {
      files.push({ dir, fileName });
    } else {
      const subFiles = getPostsFromDir(path.join(dir, fileName)) || [];
      files.push(...subFiles);
    }
  });
  return files;
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = getPostsFromDir(postsDirectory);
  const allPostsData = fileNames.map(({ dir, fileName }) => getPostMeta(dir, fileName));

  // Sort posts by date
  return allPostsData.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

export async function getPostData(id: string): Promise<Post> {
  const fileNames = getPostsFromDir(postsDirectory);
  const fileObj = fileNames.find((file) => file.fileName.indexOf(id) > -1)!;
  const fileContents = fs.readFileSync(path.join(fileObj.dir, fileObj.fileName), "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const contentHtml = await parseContent(matterResult.content);

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
    title: matterResult.data.title,
    date: matterResult.data.date.toISOString(),
  };
}


export async function parseContent(mdxString: string): Promise<string> {
  const file = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypePrettyCode, {
      // See Options section below.
    })
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(mdxString)

  return String(file)
}
