import clx from 'classnames'


export { clx }

export const formatTitle = (title: string): string[] => {
  return title.split(':')
}