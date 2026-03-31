import React from 'react'
import { PaginationWrapper } from './styled'

export const getSlicedPages = (items, { currentPage, ITEMS_PER_PAGE }) => {
  const prevPage = currentPage - 1
  const results = items.slice(prevPage * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  return results
}

const PaginationCounter = ({ totalPages, onPageChange, currentPage }) => {
  return [...Array(totalPages)]
    .map((i, id) => (
      <li
        className={`page-item pointer ${currentPage === id + 1 ? 'active' : ''}`}
        key={id + 1}
        onClick={() => onPageChange(id + 1)}
      >
        <span className='page-link'>{id + 1}</span>
      </li>
    ))
}

const NextLink = ({ onPageChange, currentPage, totalPages }) => (
  currentPage === totalPages
    ? <li style={{ cursor: 'not-allowed' }} className='page-item disabled'><span className='page-link'>{'>>'}</span></li>
    : <li onClick={() => onPageChange('next')} className='page-item pointer'><span className='page-link'>{'>>'}</span></li>
)

const PreviousLink = ({ previousLabel, onPageChange, currentPage }) => (
  currentPage === 1
    ? <li style={{ cursor: 'not-allowed' }} className='page-item disabled'><span className='page-link'>{previousLabel}</span></li>
    : <li onClick={() => onPageChange('previous')} className='page-item pointer'><span className='page-link'>{previousLabel}</span></li>
)

const Pagination = ({ previousLabel, totalPages, onPageChange, currentPage }) => {
  if (!totalPages || totalPages <= 1) return null

  return (
    <PaginationWrapper>
      <div className='flex flex-row justify-content-center pa1'>
        <ul className='pagination mb-0'>
          <PreviousLink {...{ previousLabel, onPageChange, currentPage }} />
          <PaginationCounter {...{ totalPages, onPageChange, currentPage }} />
          <NextLink {...{ onPageChange, currentPage, totalPages }} />
        </ul>
      </div>
    </PaginationWrapper>
  )
}

Pagination.defaultProps = {
  previousLabel: '<<',
  nextLabel: '>>'
}

export default Pagination
