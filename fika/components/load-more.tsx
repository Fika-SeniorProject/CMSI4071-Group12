
'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export function LoadMore({ loadMoreShops }: { loadMoreShops: () => void }) {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      loadMoreShops()
    }
  }, [inView, loadMoreShops])

  return <div ref={ref} />
}
