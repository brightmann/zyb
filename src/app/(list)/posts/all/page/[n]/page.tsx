import type { Metadata } from 'next'

import { Grid } from '@/components/grid'
import { Pager, paginate, totalPages } from '@/components/pagination'
import { Post } from '@/components/post'
import { queryAllPosts } from '@/service'

interface PageProps {
  params: { n: string }
}

export const generateStaticParams = async () => {
  const {
    search: { nodes },
  } = await queryAllPosts()
  const total = totalPages(nodes.length)
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
    n: `${i + 2}`,
  }))
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => ({
  title: `All Posts - Page ${params.n}`,
})

export default async function Page({ params }: PageProps) {
  const {
    search: { nodes },
  } = await queryAllPosts()
  const { curr, total, items } = paginate(nodes, parseInt(params.n, 10))

  return (
    <>
      <Grid>
        {items.map(node => (
          <Post key={node.number} node={node} />
        ))}
      </Grid>
      <Pager curr={curr} total={total} />
    </>
  )
}
