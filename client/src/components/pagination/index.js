/* eslint-disable */
import React from 'react'
import { PaginationWrapper } from './styled'

export const getSlicedPages = (items, { currentPage, ITEMS_PER_PAGE }) => {
  const prevPage = currentPage - 1
  const results = items.slice(prevPage * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  return results
}

const PaginationCounter = ({ totalPages, onPageChange }) => {
  return [...Array(totalPages)]
    .map((i, id) => (
      <li
        className='page-item pointer'
        key={id + 1} onClick={() => onPageChange(id + 1)}
      >
        <span className='page-link'>{id + 1}</span>
      </li>
    ))
}

const NextLink = ({ previousLabel, onPageChange, currentPage, totalPages }) => (
  currentPage === totalPages
    ? <li style={{ cursor: 'not-allowed' }} className='page-item disabled'><a className='page-link'>{'>>'}</a></li>
    : <li onClick={() => onPageChange('next')} className='page-item pointer'><a className='page-link'>{'>>'}</a></li>
)

const PreviousLink = ({ previousLabel, onPageChange, currentPage }) => (
  currentPage === 1
    ? <li style={{ cursor: 'not-allowed' }} className='page-item disabled'><a className='page-link'>{previousLabel}</a></li>
    : <li onClick={() => onPageChange('previous')} className='page-item pointer'><a className='page-link'>{previousLabel}</a></li>
)

const Pagination = ({ previousLabel, nextLabel, totalPages, itemsPerPage, onPageChange, currentPage }) => {
  return (
    <PaginationWrapper>
      <div className='flex flex-row justify-content-center pa1'>
        <ul className='pagination'>
          <PreviousLink {...{ previousLabel, onPageChange, currentPage }} />
          <PaginationCounter {...{ totalPages, onPageChange }} />
          <NextLink {...{ previousLabel, onPageChange, currentPage, totalPages }} />
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
