const appTitle = document.title
document.addEventListener('visibilitychange', () => {
  const isHidden = document.hidden
  if (isHidden) {
    document.title = `😴HALO - seize the day`
  } else {
    document.title = appTitle
  }
})
