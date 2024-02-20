/** @type {import('next').NextConfig} */
import nextMdx from '@next/mdx'
import remarkGfm from 'remark-gfm'
import html from "remark-html";
import rehypePrettyCode from "rehype-pretty-code";

const withMdx = nextMdx({
  // By default only the `.mdx` extension is supported.
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, html],
    rehypePlugins: [[rehypePrettyCode, {}]],
  },
})

const nextConfig = withMdx({
  // Support MDX files as pages:
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
})

export default nextConfig;