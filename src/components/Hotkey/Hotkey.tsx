import React, { forwardRef, useCallback, useState } from 'react'

import styled, { css } from 'styled-components'

import { translateKey } from '../../utils'

interface IHotKeyProps {
  readonly binding?: boolean
  readonly disabled?: boolean
  readonly value?: string
  readonly onClick?: () => void
  readonly onKeyDown?: (event: React.KeyboardEvent) => void
}

interface IKbdProps {
  readonly $binding?: boolean
  readonly $disabled?: boolean
  readonly $pressed?: boolean
}

const Container = styled.div`
  &:focus-visible {
    outline: none;
  }
`

// FIXME: This css is absolutely horrendous 😱
const Kbd = styled.kbd<IKbdProps>`
  padding: 5px;
  font-weight: bold;
  font-size: 12px;
  width: 100px;
  min-height: 31px;
  background-color: ${({ $pressed, theme }) =>
    $pressed ? theme.palette.neutralTertiary : theme.palette.neutralLight};
  color: ${({ theme }) => theme.palette.themeWhite};
  border-radius: 1px;
  cursor: ${({ $disabled }) => ($disabled ? 'initial' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: ${({ $binding, $disabled, theme }) =>
    $disabled
      ? 'none'
      : `solid ${
          $binding
            ? `2px ${theme.palette.themePrimary}`
            : `1px ${theme.palette.neutralPrimary}`
        }`};

  ${({ $disabled, theme }) =>
    $disabled
      ? ''
      : css`
          &:hover {
            border: solid 2px ${theme.palette.themePrimary};
          }
        `}
`

export default forwardRef(function HotKey(
  {
    binding,
    disabled,
    value,
    onClick = () => {},
    onKeyDown = () => {},
  }: IHotKeyProps,
  ref: React.MutableRefObject<HTMLDivElement>
) {
  const [pressed, setPressed] = useState(false)

  const handleClick = useCallback(() => {
    ref.current.focus()
    onClick()
  }, [ref, onClick])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      ref.current.focus()
      onKeyDown(event)
    },
    [ref, onKeyDown]
  )

  return (
    <Container
      ref={ref}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      tabIndex={0}
    >
      <Kbd $binding={binding} $disabled={disabled} $pressed={pressed}>
        {binding ? 'Assigning..' : value ? translateKey(value) : 'Assign key'}
      </Kbd>
    </Container>
  )
})
