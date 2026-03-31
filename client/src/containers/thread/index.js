import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useGlobal, useDispatch } from 'reactn'
import ThreadList from './common/ThreadList'
import ThreadHeader from './common/Header'
import Pagination, { getSlicedPages } from 'components/pagination'
import SidebarContentTopics from 'components/SidebarFixed/Contents/Topics'
import Loading from 'components/Loading'
import ContainerLayout from 'wrappers/ContainerLayout'
import { ButtonRow, FeatureCard, TwoColumnLayout } from 'components/common'

const ITEMS_PER_PAGE = 6

const getTotalPages = (items) => Math.ceil(items.length / ITEMS_PER_PAGE)

const PageActionLink = styled(Link)`
  display: inline-flex;
`

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
    <ContainerLayout>
      <TwoColumnLayout>
        <div>
          {topics ? (
            <FeatureCard className='p-3 p-lg-4'>
              <SidebarContentTopics data={topics} location={location} />
            </FeatureCard>
          ) : (
            <Loading text='Loading threads...' />
          )}
        </div>
        <div>
          <ButtonRow className='justify-content-between mb-3'>
            {threads ? (
              <Pagination
                totalPages={getTotalPages(threads)}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={onPaginationChange}
                onPageChangeFunc={setCurrentPage}
                currentPage={currentPage}
              />
            ) : <div />}
            <PageActionLink to={`${match.url}/create`}>
              <button className='btn btn-outline-info pointer'>Create New Thread</button>
            </PageActionLink>
          </ButtonRow>
          <FeatureCard className='overflow-hidden'>
            <div className='app-card-header'>
              {topics && <ThreadHeader topic={topics.find(t => t.id === parseInt(topicId, 10))} />}
            </div>
            <div className='app-card-body pt-0'>
              {threads ? (
                <div className='list-group list-group-flush'>
                  <ThreadList items={getSlicedPages(threads, { currentPage, ITEMS_PER_PAGE })} />
                </div>
              ) : (
                <Loading text='Loading threads...' />
              )}
            </div>
          </FeatureCard>
        </div>
      </TwoColumnLayout>
    </ContainerLayout>
  )
}

export default ThreadPage
