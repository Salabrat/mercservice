// Redirects the vertical wheel over a horizontal carousel to horizontal scrolling
// and limits touch gestures to horizontal panning. This prevents the page from
// jittering up/down while the user scrolls the brand logo carousels.
export const enableCarouselWheel = (container) => {
  if (!container) return () => {}

  const previousTouchAction = container.style.touchAction

  const onWheel = (e) => {
    const maxScroll = container.scrollWidth - container.clientWidth
    // Carousel has nothing to scroll — let the page behave as usual
    if (maxScroll <= 1) return

    const canLeft = () => container.scrollLeft > 1
    const canRight = () => container.scrollLeft < maxScroll - 1

    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Horizontal wheel (trackpad / Shift+wheel)
      if ((e.deltaX < 0 && !canLeft()) || (e.deltaX > 0 && !canRight())) return
      e.preventDefault()
      container.scrollLeft += e.deltaX
    } else {
      // Vertical wheel → scroll the carousel horizontally, but only if it can move
      if ((e.deltaY < 0 && !canLeft()) || (e.deltaY > 0 && !canRight())) return
      e.preventDefault()
      container.scrollLeft += e.deltaY
    }
  }

  container.addEventListener('wheel', onWheel, { passive: false })
  // Mobile/touch: handle only horizontal panning here, so swiping the logos
  // sideways doesn't drag the whole page up/down.
  container.style.touchAction = 'pan-x'

  return () => {
    container.removeEventListener('wheel', onWheel)
    container.style.touchAction = previousTouchAction
  }
}