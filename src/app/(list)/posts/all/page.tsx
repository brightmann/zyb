import type { Metadata } from 'next'

import { Grid } from '@/components/grid'
import { Pager, paginate } from '@/components/pagination'
import { Post } from '@/components/post'
import { queryAllPosts } from '@/service'

export const metadata: Metadata = {
  title: 'All Posts',
}

export default async function Page() {
  const {
    search: { nodes },
  } = await queryAllPosts()
  const { curr, total, items } = paginate(nodes, 1)

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
