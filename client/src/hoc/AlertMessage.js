import Animate, {
  Flash,
  Bounce
} from 'animate-css-styled-components'
import { Card } from 'reactstrap'

export default () => (
  <Animate
    Animation={[Flash, Bounce]}
    duration='0.8s'
    delay='0.2s'
  >
    <Card>
    card content...
    </Card>
  </Animate>

)
