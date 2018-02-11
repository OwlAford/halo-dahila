import React from 'react'
import UnitBar from './UnitBar'

export default ({ params }) => (
  <div className='progress-chart grid'>
    <div className='exercise'>
      {
        params.map((item, i) => (
          <UnitBar key={i} {...item} />
        ))
      }
    </div>
  </div>
)
