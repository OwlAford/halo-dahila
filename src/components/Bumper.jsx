import React from 'react'
import LazyLoader from './LazyLoader'
import Spin from './Spin'

const Bumper = ({ compnent }) => (
  <LazyLoader load={compnent}>
    {Bumper => Bumper ? <Bumper /> : <Spin delay={200} />}
  </LazyLoader>
)

export const getBumper = comp => () => <Bumper compnent={comp} />

export default Bumper
