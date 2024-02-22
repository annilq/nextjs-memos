import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypePrettyCode from "rehype-pretty-code";

const components = {
  a: (props: { children: React.ReactNode }) => (
    <a {...props} className="text-blue-500">
      {props.children}
    </a>
  ),
  h1: (props: { children: React.ReactNode }) => (
    <h1 {...props} className="font-bold my-4 text-4xl">
      {props.children}
    </h1>
  ),
  h2: (props: { children: React.ReactNode }) => (
    <h2 {...props} className="font-bold my-4 text-3xl">
      {props.children}
    </h2>
  ),
  h3: (props: { children: React.ReactNode }) => (
    <h3 {...props} className="font-bold my-4 text-2xl">
      {props.children}
    </h3>
  ),
  h4: (props: { children: React.ReactNode }) => (
    <h4 {...props} className="font-bold my-4 text-xl">
      {props.children}
    </h4>
  ),
  p: (props: { children: React.ReactNode }) => (
    <p {...props} className="my-4">
      {props.children}
    </p>
  ),
  ol: (props: { children: React.ReactNode }) => (
    <ol {...props} className="my-4">
      {props.children}
    </ol>
  ),
  ul: (props: { children: React.ReactNode }) => (
    <ul {...props} className="my-4">
      {props.children}
    </ul>
  ),
  pre: (props: { children: React.ReactNode }) => (
    <pre {...props} className="my-4 overflow-auto">
      {props.children}
    </pre>
  ),
  code: (props: { children: React.ReactNode }) => (
    <code {...props} className="my-4 [&>span]:mx-4">
      {props.children}
    </code>
  ),

}

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [rehypePrettyCode],
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}