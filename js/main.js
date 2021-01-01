let draw = SVG().addTo('#svg').size('100%', '100%')
tess1();

let clear = () => {
  return new Promise(() => {
    draw.clear()
  })
}

let load = (tess) => {
  if (tess === 'tess1') {
    tess1()
  } else if (tess === 'tess2') {
    tess2()
  } else if (tess === 'tess3') {
    tess3()
  } else if (tess === 'tess4') {
    tess4()
  }
}

document.querySelectorAll('.tl').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.tl').forEach(l => {
      l.classList.remove('active')
    })
    link.classList.add('active')
    
    clear()
    .then(load(link.id))
  })
})
