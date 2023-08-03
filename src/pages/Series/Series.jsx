import React from 'react'

const Series = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }

  return (
    <div>Series</div>
  )
}

export default Series