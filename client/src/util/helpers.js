export const getSlicedPages = (items, { currentPage, ITEMS_PER_PAGE }) => {
  const prevPage = currentPage - 1
  const results = items.slice(prevPage * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  return results
}
