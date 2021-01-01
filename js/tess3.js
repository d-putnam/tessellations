let tess3 = () => {
  let group = draw.group()

  let amount = 2
  let baseSize = 150
  let duration = 50000
  let times = 4

  let points = []
  let initPoints = () => {
    return new Promise(() => {
      for (let i=0; i<(window.innerWidth / (baseSize)) +1; i++) {
        for (let j=0; j<(window.innerHeight / (baseSize)) + 2; j++) {
          if (j % 2 === 0) {
            points.push({
              x: (i * baseSize) - baseSize, 
              y: (j * ((baseSize/2)*Math.sqrt(3))) 
            })
          } else {
            points.push({
              x: (i * baseSize) + (baseSize/2) - baseSize, 
              y: (j * ((baseSize/2)*Math.sqrt(3))) 
            })
          }
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
            .scheme('tetrade')   
            .variation('soft')
            .distance(Math.random())
      colors = scheme.colors();
      for (let i=0; i<colors.length; i++) {
        colors[i] = '#' + colors[i]
      }
    })
  }

  let drawDots = (center, size) => {
    return new Promise(() => {
      let nest = draw.nested()
      let dot = nest.circle(size)
      dot.attr({
                cx: center.x ,
                cy: center.y,
              })
          .animate({
            duration: duration/12,
            swing: true,
            times:times*10,
            ease: '<>',
            delay:1000
          })
          .scale(1.5)
    })
  }

  let drawTri = (center) => {
    return new Promise(() => {

      let nest = draw.nested()
      let size = baseSize 
      let coords1 = `
        ${center.x},${center.y} 
        ${center.x+size},${center.y}
        ${center.x+(size/2)},${center.y-((size/2)*Math.sqrt(3))} 
      `
      let center1 = {
        x: center.x + size/2,
        y: center.y - (((size/2)*Math.sqrt(3)))/3
      }
      let coords2 = `
        ${center.x},${center.y} 
        ${center.x+size},${center.y}
        ${center.x+(size/2)},${center.y+((size/2)*Math.sqrt(3))} 
      `
      let center2 = {
        x: center.x + size/2,
        y: center.y + (((size/2)*Math.sqrt(3)))/3
      }

      let tri1 = nest.polygon(coords1)
                    .fill({opacity: 0.2, color: colors[0]})
                    .stroke({width: 2, color: '#000'})
      let tri2 = nest.polygon(coords2)
                    .fill({opacity: 0.2, color: colors[1]})
                    .stroke({width: 2, color: '#000'})

      let innerC1 = `
        ${center.x},${center.y} 
        ${center1.x},${center1.y}
        ${center.x+size},${center.y} 
      `
      let innerC2 = `
        ${center.x},${center.y} 
        ${center1.x},${center1.y}
        ${center.x+(size/2)},${center.y-((size/2)*Math.sqrt(3))} 
      `
      let innerC3 = `
        ${center.x+size},${center.y} 
        ${center1.x},${center1.y}
        ${center.x+(size/2)},${center.y-((size/2)*Math.sqrt(3))} 
      `
      let inner1 = nest.polygon(innerC1)
        .fill({opacity: 0.2, color: colors[randomNum(0, colors.length)]})
        .stroke({width: 2, color: '#000'})
      let inner2 = nest.polygon(innerC2)
        .fill({opacity: 0.2, color: colors[randomNum(0, colors.length)]})
        .stroke({width: 2, color: '#000'})
      let inner3 = nest.polygon(innerC3)
        .fill({opacity: 0.2, color: colors[randomNum(0, colors.length)]})
        .stroke({width: 2, color: '#000'})


      let innerC4 = `
        ${center2.x},${center2.y} 
        ${center.x},${center.y}
        ${center.x+size},${center.y} 
      `
      let innerC5 = `
        ${center.x},${center.y} 
        ${center2.x},${center2.y}
        ${center.x+(size/2)},${center.y+((size/2)*Math.sqrt(3))} 
      `
      let innerC6 = `
        ${center.x+size},${center.y} 
        ${center2.x},${center2.y}
        ${center.x+(size/2)},${center.y+((size/2)*Math.sqrt(3))} 
      `
      
      let inner4 = nest.polygon(innerC4)
        .fill({opacity: 0.2, color: colors[randomNum(0, colors.length)]})
        .stroke({width: 2, color: '#000'})
      
      let inner5 = nest.polygon(innerC5)
        .fill({opacity: 0.2, color: colors[randomNum(0, colors.length)]})
        .stroke({width: 2, color: '#000'}) 
      let inner6 = nest.polygon(innerC6)
        .fill({opacity: 0.2, color: colors[randomNum(0, colors.length)]})
        .stroke({width: 2, color: '#000'})
      
      rotateTri(nest)
    })
  }


  let animSettings = {
    duration: duration,
    swing: false,
    times:times,
    ease: '<>',
    delay:1000
  }

  let rotateTri = (nest) => {
    let children = nest.children()
    for (let i=0; i<children.length; i++) {
      children[i].animate(animSettings)
                .rotate((360 / amount) * amount)
      group.add(children[i])
    }
  }


  draw.filterWith(function(add) {
    var blur = add.gaussianBlur(5)
    add.blend(add.$source, blur)
  })

  initPoints()
    .then(initColors())
    .then(points.forEach(point => {
      drawDots(point, 20)
    }))
    .then(points.forEach(point => {
      drawTri(point)
    }))
}