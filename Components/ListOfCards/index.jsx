import { MACHINES } from '../../const/machines'
import { Card } from '../Card'

export function ListOfCards() {
  return <div>
    {
      MACHINES.map(machine => <Card
      key={machine[0]}
      namekey={machine[0]}
      machine={machine[1]}
    />)
  }
  </div>
}