export default function useDiffClick(clickEffect: () => void, doubleClickEffect: () => void) {
  let timeout: NodeJS.Timeout | undefined
  const handleClickFn = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      clickEffect()
    }, 200)
  }
  const handleDoubleClickFn = () => {
    clearTimeout(timeout)
    doubleClickEffect()
  }
  return {
    handleClickFn,
    handleDoubleClickFn,
  }
}
