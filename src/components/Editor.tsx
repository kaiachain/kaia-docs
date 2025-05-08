import { ReactElement } from 'react'
import { getPath, RoutePath } from '../common/codesandbox'

const Editor = ({
  module,
  route,
}: {
  module: `/${string}`
  route: RoutePath
}): ReactElement => {
  const path = getPath({
    module,
    route,
  })

  return (
    <iframe
      src={path}
      style={{
        width: '100%',
        height: 700,
        border: 0,
        borderRadius: 4,
        overflow: 'hidden',
      }}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  )
}

export default Editor
