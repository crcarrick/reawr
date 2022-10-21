import { useCallback } from 'react'

import { Nav, Text } from '@fluentui/react'
import type { INavLink } from '@fluentui/react'
import { Outlet, useNavigate } from 'react-router'
import styled from 'styled-components'

import { routes } from './router'
import { useAPI } from '../contexts'
import { useStateAsync } from '../hooks'

interface IContainerProps {
  readonly $isMac: boolean
}

const Container = styled.main<IContainerProps>`
  flex: 1;
  display: flex;
  margin-top: ${({ $isMac }) => ($isMac ? '31px' : '0')};
  min-height: ${({ $isMac }) => ($isMac ? 'calc(100vh - 31px)' : '100vh')};
`

const MenuContainer = styled.section`
  width: 200px;
  min-height: 100%;
  border-right: solid 1px;
`

const ContentContainer = styled.section`
  flex: 1;
  min-height: 100%;
  max-width: var(--content-width);
`

const RouteContainer = styled.div`
  flex: 1;
  padding: 30px;
  max-width: 100%;
`

const TopBar = styled.header`
  flex: 1;
  display: flex;
  min-height: 30px;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px;
  position: fixed;
  width: 100%;
  background: ${({ theme }) => theme.palette.white};
  z-index: 2;
  -webkit-app-region: drag;
`

const Title = styled(Text)`
  font-weight: bold;
`

export function Layout() {
  const api = useAPI()
  const navigate = useNavigate()

  const [os] = useStateAsync(
    () => api.getOS(),
    { isMac: false, isWin: false, isLinux: false },
    []
  )

  const handleLinkClick = useCallback(
    (ev?: React.MouseEvent, item?: INavLink) => {
      ev.preventDefault()

      navigate(item.url)
    },
    [navigate]
  )

  const links: INavLink[] = routes.reduce((acc, { id, handle, path }) => {
    if (!handle.inNav) return acc

    return [
      ...acc,
      {
        key: id,
        url: path,
        name: handle.name,
      },
    ]
  }, [])

  return (
    <>
      {os.isMac ? (
        <TopBar>
          <Title variant="medium">REAWR</Title>
        </TopBar>
      ) : null}
      <Container $isMac={os.isMac}>
        <MenuContainer>
          <Nav
            groups={[
              {
                links,
              },
            ]}
            onLinkClick={handleLinkClick}
          />
        </MenuContainer>
        <ContentContainer>
          <RouteContainer>
            <Outlet />
          </RouteContainer>
        </ContentContainer>
      </Container>
    </>
  )
}
