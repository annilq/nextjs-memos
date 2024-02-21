import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from "rehype-pretty-code";

const components = {
  h1: (props) => (
    <h1 {...props} className="font-bold my-4 text-4xl">
      {props.children}
    </h1>
  ),
  h2: (props) => (
    <h2 {...props} className="font-bold my-4 text-3xl">
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3 {...props} className="font-bold my-4 text-2xl">
      {props.children}
    </h3>
  ),
  h4: (props) => (
    <h4 {...props} className="font-bold my-4 text-xl">
      {props.children}
    </h4>
  ),
  p: (props) => (
    <p {...props} className="my-4">
      {props.children}
    </p>
  ),
  ol: (props) => (
    <ol {...props} className="my-4">
      {props.children}
    </ol>
  ),
  ul: (props) => (
    <ul {...props} className="my-4">
      {props.children}
    </ul>
  ),
  pre: (props) => (
    <pre {...props} className="my-4 overflow-auto">
      {props.children}
    </pre>
  ),
  code: (props) => (
    <code {...props} className="my-4 [&>span]:mx-4">
      {props.children}
    </code>
  ),

}

export function CustomMDX(props) {
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