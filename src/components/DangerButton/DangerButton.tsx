import type { ComponentProps } from 'react'

import { PrimaryButton } from '@fluentui/react'
import styled, { css } from 'styled-components'

const Button = styled(PrimaryButton)`
  ${({ disabled }) =>
    disabled
      ? css`
          background-color: #f3f2f1;
          border-color: #f3f2f1;
        `
      : css`
          background-color: #f25022;
          border-color: #f25022;

          &:hover {
            background-color: #da471f;
            border-color: #da471f;
          }
          &:active {
            background-color: #b83c1a;
            border-color: #b83c1a;
          }
        `}
`

export default function DangerButton(props: ComponentProps<typeof Button>) {
  return <Button {...props} />
}
