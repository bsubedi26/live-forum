import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobal, useDispatch } from 'reactn'
import ThreadList from './common/ThreadList'
import ThreadHeader from './common/Header'
import Pagination, { getSlicedPages } from 'components/Pagination'
import SidebarContentTopics from 'components/SidebarFixed/Contents/Topics'
import SidebarFixed from 'components/SidebarFixed'

const ITEMS_PER_PAGE = 6

const getTotalPages = (items) => Math.ceil(items.length / ITEMS_PER_PAGE)

const ThreadPage = ({ location, match }) => {
  const [threads] = useGlobal('threads')
  const [topics] = useGlobal('topics')
  const threadsFind = useDispatch('threads/find')
  const topicsFind = useDispatch('topics/find')

  const [currentPage, setCurrentPage] = React.useState(1)
  const { topicId } = match.params

  React.useEffect(() => {
    topicsFind({
      query: {
        $sort: { updated_at: 1 }
      }
    })
    threadsFind({
      query: {
        topic_id: topicId
      }
    })
  }, [topicId, topicsFind, threadsFind])

  const onPaginationChange = (selected) => {
    if (selected === 'previous') return setCurrentPage(currentPage - 1)
    if (selected === 'next') return setCurrentPage(currentPage + 1)
    return setCurrentPage(selected)
  }

  return (
    <div className='row mx-0'>
      {/* <div className='d-none d-md-block col-lg-3 col-md-3 p-0'> */}
      <div className='col-lg-3 col-md-3 p-0'>
        {topics && (
          <SidebarFixed>
            <SidebarContentTopics data={topics} location={location} />
          </SidebarFixed>
        )}
      </div>
      <div className='col-lg-9 col-md-9 col-sm-12'>
        <div className='d-flex justify-content-center mt-4 flex-wrap'>
          {threads && (
            <Pagination
              totalPages={getTotalPages(threads)}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={onPaginationChange}
              onPageChangeFunc={setCurrentPage}
              currentPage={currentPage}
            />
          )}
          {threads && (
            <Link to={`${match.url}/create`} className='pa2'>
              <button className='btn btn-outline-info pointer'>Create New Thread</button>
            </Link>
          )}

        </div>
        <div className='d-flex mt-4'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>
                {topics && <ThreadHeader topic={topics.find(t => t.id === parseInt(topicId, 10))} />}
              </div>
              {threads && <ThreadList items={getSlicedPages(threads, { currentPage, ITEMS_PER_PAGE })} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreadPage
