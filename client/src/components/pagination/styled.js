import styled from 'styled-components'

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.25rem;

  .pagination {
    display: flex;
    gap: 0.45rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  li {
    list-style: none;
    display: flex;
    cursor: pointer;
  }

  .page-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    min-height: 42px;
    padding: 0.65rem 0.9rem;
    border: 1px solid rgba(31, 61, 91, 0.12);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.92);
    color: var(--accent-strong);
    font-weight: 600;
    transition: background-color 180ms ease, color 180ms ease, border-color 180ms ease;
  }

  .page-item:hover .page-link {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.2);
  }

  .page-item.active .page-link {
    background: var(--accent-strong);
    border-color: var(--accent-strong);
    color: var(--color-white);
  }

  .page-item.disabled .page-link {
    opacity: 0.5;
  }
`
