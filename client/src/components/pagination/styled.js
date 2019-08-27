import styled from 'styled-components'

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: .25rem;
  .pagination {
    display: flex;
    li {
      list-style: none;
      border-radius: .25rem;
      display: flex;
      cursor: pointer;
      
      a {
        text-decoration: none;
        position: relative;
        display: block;
        padding: .5rem .75rem;
        margin-left: -1px;
        line-height: 1.25;
        color: #007bff;
        background-color: #fff;
        border: 1px solid #dee2e6;
        &:hover {
          background-color: #d4d4d4;
        }
        &:focus {
          outline: none;
          /* outline-width: 1px;
          outline-style: dashed;
          outline-color: blue; */
        }
      }
    }
  }
`
