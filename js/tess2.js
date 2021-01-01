let tess2 = () => {
  let group = draw.group()

  let amount = 2
  let baseSize = 100

  let points = []
  let smallPoints = []
  let initPoints = () => {
    return new Promise(() => {
      for (let i=0; i<(window.innerWidth / (baseSize * 2))+3; i++) {
        for (let j=0; j<(window.innerHeight / (baseSize * 2))+3; j++) {
          points.push({
            x: (i * baseSize * 2.74) - baseSize, 
            y: (j * baseSize * 2.74) - (baseSize + 500)
          })
          smallPoints.push({
            x: ((i * baseSize * 2.74)) - (baseSize * 2.37),
            y: ((j * baseSize * 2.74)) - ((baseSize * 2.38) + 500)
          })
        }
      }
    })
  }

  var randomNum = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let colors = []
  let initColors = () => {
    return new Promise(() => {
      var scheme = new ColorScheme;
      scheme.from_hue(randomNum(0,360))         
            .scheme('triade')   
            .variation('pastel')
            .distance(Math.random())
            .web_safe(false)
      colors = scheme.colors();
      for (let i=0; i<colors.length; i++) {
        colors[i] = '#' + colors[i]
      }
    })
  }

  let drawTri = (center) => {
    return new Promise(() => {
      let nest = draw.nested()
      let size = baseSize 
      let coords = `
        ${center.x+(size/2)},${center.y-((size/2)*Math.sqrt(3))} 
        ${center.x},${center.y} 
        ${center.x+size},${center.y}
      `
      let coords2 = `
        ${center.x+(size/2)},${center.y+((size/2)*Math.sqrt(3))} 
        ${center.x},${center.y} 
        ${center.x+size},${center.y}
      `
      let coords3 = `
        ${center.x-((size/2)*Math.sqrt(3))},${center.y-(size/2)} 
        ${center.x},${center.y} 
        ${center.x-((size/2)*Math.sqrt(3))},${center.y+(size/2)}
      `

      // tri 1,2,3,4
      nest.polygon(coords)
        .fill({opacity: 0.2, color: colors[0]})
        .stroke({width: 2, color: '#000'})
      nest.polygon(coords2)
        .fill({opacity: 0.2, color: colors[0]})
        .stroke({width: 2, color: '#000'})
      nest.polygon(coords3)
        .fill({opacity: 0.2, color: colors[0]})
        .stroke({width: 2, color: '#000'})
      nest.polygon(coords2)
        .fill({opacity: 0.2, color: colors[0]})
        .stroke({width: 2, color: '#000'})
        .transform({
          translateX: -baseSize * 0.435,
          translateY: baseSize * 0.935
        })
        .rotate(90)

      rotateTri(nest)
    })
  }

  let nests = []
  let drawSquares = (center) => {
    return new Promise(() => {
      let nest = draw.nested()
      for (let i=0; i<amount; i++) {
        let size = baseSize 
        // rect 1+2
        nest.rect(size,size)
            .fill({opacity: 0.2, color: colors[randomNum(0,colors.length)]})
            .stroke({width: 2, color: '#000'})
            .attr({ 
              x: center.x - (baseSize * 0.685), //+ (i*20),
              y: center.y - (baseSize * 1.188) //+ (i*20)
            })   
            .rotate(30)
        nest.rect(size,size)
            .fill({opacity: 0.2, color: colors[randomNum(0,colors.length)]})
            .stroke({width: 2, color: '#000'})
            .attr({ 
              x: center.x - (baseSize * 0.685),// + (i*20),
              y: center.y + (baseSize * 0.185) //+ (i*10)
            })   
            .rotate(60)
      }
      rotateSquares(nest)
      nests.push(nest)
    })
  }


  let animSettings = {
    duration: 50000,
    swing: false,
    times:4,
    ease: '<>',
    delay:1000
  }

  let rotateSquares = (nest) => {
    let children = nest.children()
    for (let i=0; i<children.length; i++) {
      children[i].animate(animSettings)
                .rotate(((90 * (i+1)) / amount) * amount)
      group.add(children[i])
    }
  }

  let rotateTri = (nest) => {
    let children = nest.children()
    for (let i=0; i<children.length; i++) {
      children[i].animate(animSettings)
                .rotate((360 / amount) * amount)
      group.add(children[i])
    }
  }


  let spinSettings = {
    duration: 200000,
    swing: false,
    times:1,
    delay:1000
  }
  let center = [window.innerWidth /2, window.innerHeight / 2]
  group.animate(spinSettings)
       .rotate(360, center[0], center[1])


  draw.filterWith(function(add) {
    var blur = add.gaussianBlur(5)
    add.blend(add.$source, blur)
  })

  initPoints()
    .then(initColors())
    .then(points.forEach(point => {
      drawSquares(point)
      drawTri(point)
    })
    )
    .then(smallPoints.forEach(point=>{
      drawSquares(point)
      drawTri(point)
    }))
}