import React from 'react'
import LazyLoader from './LazyLoader'
import Loading from './Loading'

const Bumper = ({ compnent }) => (
  <LazyLoader load={compnent}>
    {Bumper => Bumper ? <Bumper /> : <Loading delay={200} />}
  </LazyLoader>
)

export const getBumper = comp => () => <Bumper compnent={comp} />

export default Bumper
