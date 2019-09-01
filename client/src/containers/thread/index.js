import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobal } from 'reactn'
import ThreadList from './common/ThreadList'
import SidebarFixed from 'components/sidebar'
import ThreadHeader from './common/Header'
import Pagination, { getSlicedPages } from 'components/Pagination'
import Services from 'services'

const ITEMS_PER_PAGE = 6

const getTotalPages = (items) => Math.ceil(items.length / ITEMS_PER_PAGE)

const ThreadPage = ({ match }) => {
  const [threads, setThreads] = useGlobal('threads')
  const [topics, setTopics] = useGlobal('topics')
  const { topicId } = match.params

  const [currentPage, setCurrentPage] = React.useState(1)

  React.useEffect(() => {
    const fetchData = async () => {
      const { data: topicData } = await Services.Topic.find()
      const { data: threadData } = await Services.Thread.find({
        query: {
          topic_id: topicId
        }
      })

      setThreads(threadData)
      setTopics(topicData)
    }
    fetchData()
  }, [topicId])

  const onPaginationChange = (selected) => {
    if (selected === 'previous') return setCurrentPage(currentPage - 1)
    if (selected === 'next') return setCurrentPage(currentPage + 1)
    return setCurrentPage(selected)
  }

  return (
    <div className='row mx-0'>
      {/* <Toast ref={cmp => this.toast = cmp} /> */}

      <div className='d-none d-md-block'>
        {topics.length > 0 ? <SidebarFixed data={topics} /> : null}
      </div>

      <div className='col-4' />
      <div className='col-md-8'>
        <div className='d-flex justify-content-center mt-4 flex-wrap'>
          {
            threads.length > 0 ? (
              <Pagination
                totalPages={getTotalPages(threads)}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={onPaginationChange}
                onPageChangeFunc={setCurrentPage}
                currentPage={currentPage}
              />
            ) : null
          }
          <Link to={`${match.url}/create`} className='pa2'>
            <button className='btn btn-outline-info pointer'>Create New Thread</button>
          </Link>

        </div>

        <div className='d-flex mt-4'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>
                <ThreadHeader topic={topics.find(t => t.id === parseInt(topicId, 10))} />
              </div>
              {threads.length > 0 ? <ThreadList items={getSlicedPages(threads, { currentPage, ITEMS_PER_PAGE })} /> : null}
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default ThreadPage
