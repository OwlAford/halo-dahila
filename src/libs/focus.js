const appTitle = document.title
document.addEventListener('visibilitychange', () => {
  const isHidden = document.hidden
  if (isHidden) {
    document.title = `😴HALO - Waiting For You`
  } else {
    document.title = appTitle
  }
})
