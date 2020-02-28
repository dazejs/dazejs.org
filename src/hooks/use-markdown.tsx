import { useState, useEffect, useContext } from 'react';
import CommonContext from '../context/common'

export function useMarkdown (name: string) {
  const [data, setData] = useState('');
  const [isError, setIsError] = useState(false)
  const common = useContext(CommonContext)

  useEffect(() => {
    const getMarkdown = async () => {
      try {
        const data = (await import(`@docs/zh/${common.version}/${name}.md`)).default
        setData(data)
      } catch (err) {
        console.error(err)
        setIsError(true)
      }
    }
    getMarkdown()
  })

  return { isError, data }
}