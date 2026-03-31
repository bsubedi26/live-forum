import styled, { css } from 'styled-components'

export const LineText = styled.span`
  color: var(--text-muted);
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
`

export const PageShell = styled.div`
  min-height: calc(100vh - 88px);
  padding: 2rem 1rem 3rem;

  @media (min-width: 768px) {
    padding: 2.5rem 1.5rem 4rem;
  }
`

export const ContentFrame = styled.div`
  width: 100%;
  max-width: ${props => props.maxWidth || '1180px'};
  margin: 0 auto;
`

export const SectionHeading = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

export const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 0.65rem;
  color: var(--accent-strong);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

export const PageTitle = styled.h1`
  margin: 0;
  color: var(--text-strong);
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.05;
`

export const SectionDescription = styled.p`
  max-width: 720px;
  margin: 0;
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.75;
`

export const cardSurface = css`
  background: var(--surface-color);
  border: 1px solid var(--border-soft);
  border-radius: 24px;
  box-shadow: var(--shadow-soft);
`

export const FeatureCard = styled.div`
  ${cardSurface};
`

export const GlassPanel = styled.div`
  background: var(--surface-glass);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 28px;
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(14px);
`

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  align-items: center;
`

export const TwoColumnLayout = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 992px) {
    grid-template-columns: ${props => props.columns || '280px minmax(0, 1fr)'};
    align-items: start;
  }
`

export const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
`
