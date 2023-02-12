import { useState } from 'react'

import { TooltipHost, Icon } from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'

interface IInfoTooltipProps {
  readonly text: string
}

export default function InfoTooltip({ text }: IInfoTooltipProps) {
  const [show, setShow] = useState(false)

  const tooltipId = useId('tooltipId')

  return (
    <TooltipHost content={show ? text : null} id={tooltipId}>
      <Icon
        iconName="Info"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        styles={{
          root: {
            width: 16,
            height: 16,
          },
        }}
      />
    </TooltipHost>
  )
}
