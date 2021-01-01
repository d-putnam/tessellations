let tess4 = () => {
  let group = draw.group()

  let amount = 3
  let baseSize = 65
  let duration = 50000
  let times = 4

  let points = []
  let initPoints = () => {
    return new Promise(() => {
      for (let i=0; i<(window.innerWidth / (baseSize * 2.5)) +1; i++) {
        for (let j=0; j<(window.innerHeight / (baseSize * 3)) + 2; j++) {
          if (j % 2 === 0) {
            points.push({
              x: (i * (baseSize*Math.sqrt(3) + baseSize)) , 
              y: (j * (baseSize*Math.sqrt(3))) * 1.37
            })
          } 
          else {
            points.push({
              x: (i * (baseSize*Math.sqrt(3) + baseSize)) + (baseSize*1.37), 
              y: (j * (baseSize*Math.sqrt(3))) * 1.37
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
            .scheme('analogic')   
            .variation('pale')
            .distance(Math.random())
            .web_safe(false)
      colors = scheme.colors();
      for (let i=0; i<colors.length; i++) {
        colors[i] = '#' + colors[i]
      }
    })
  }

  let drawSquares = (center) => {
    return new Promise(() =>{
      let nest = draw.nested()
      for (let i=0; i<amount; i++) {
        let size = baseSize / (i+1)
        let rect1 = nest.rect(size,size) 
        .fill({opacity: 0.2, color: colors[1]})
        .stroke({width: 2, color: '#000'})
        .attr({
          x: center.x - ((baseSize/2)*Math.sqrt(3)) - size*(i+1 - (i*0.5)),
          y: center.y - baseSize/2 + size*(i*0.5)
        })
        let rect2 = nest.rect(size,size)
            .fill({opacity: 0.2, color: colors[i+1]})
            .stroke({width: 2, color: '#000'}) 
            .attr({
              x: center.x - ((size/2)*Math.sqrt(3)) - (size*0.32) - size*((i*0.67)),
              y: center.y + (size * 0.68) + size*(i*1.15)
            })
            .rotate(30)
            
        let rect3 = nest.rect(size,size)
            .fill({opacity: 0.2, color: colors[i+1]})
            .stroke({width: 2, color: '#000'}) 
            .attr({
              x: center.x + (size*0.18) + size*((i*0.67)),
              y: center.y + (size * 0.68) + size*(i*1.16)
            })
            .rotate(-30)
      }
      rotateSquares(nest)
    })
  }

  let drawTri = (center) => {
    return new Promise(() => {

      let nest = draw.nested()
      let size = baseSize 
      let hexCoord = `
        ${center.x - size/2},${center.y - ((size/2)*Math.sqrt(3))} 
        ${center.x + size/2},${center.y - ((size/2)*Math.sqrt(3))} 
        ${center.x + size},${center.y} 
        ${center.x + size/2},${center.y + ((size/2)*Math.sqrt(3))} 
        ${center.x - size/2},${center.y + ((size/2)*Math.sqrt(3))} 
        ${center.x - size},${center.y} 
        ${center.x - size/2},${center.y - ((size/2)*Math.sqrt(3))} 
      `

      let hex1 = nest.polygon(hexCoord)
                    .fill({opacity: 0.2, color: colors[0]})
                    .stroke({width: 2, color: '#000'})
                    .rotate(30)
      
      let hex2 = draw.polygon(hexCoord)
                    .fill({opacity: 0.2, color: colors[0]})
                    .stroke({width: 2, color: '#000'})
                    .rotate(30)
                    .animate(animSettings)
                    .rotate((180 / amount) * amount)

      let hexCoord2 = `
                    ${center.x - size/4},${center.y - ((size/5)*Math.sqrt(3))} 
                    ${center.x + size/4},${center.y - ((size/5)*Math.sqrt(3))} 
                    ${center.x + size/2},${center.y} 
                    ${center.x + size/4},${center.y + ((size/5)*Math.sqrt(3))} 
                    ${center.x - size/4},${center.y + ((size/5)*Math.sqrt(3))} 
                    ${center.x - size/2},${center.y} 
                    ${center.x - size/4},${center.y - ((size/5)*Math.sqrt(3))} 
                  `

      let hex3 = draw.polygon(hexCoord2)
                    .fill({opacity: 0.2, color: colors[randomNum(0,colors.length)]})
                    .stroke({width: 2, color: '#000'})
                    .rotate(109)
                    .scale(1.2)
                    .animate(animSettings)
                    .rotate((-360 / amount) * amount)
          
      let hex4 = draw.polygon(hexCoord2)
                    .fill({opacity: 0.2, color: colors[randomNum(0,colors.length)]})
                    .stroke({width: 2, color: '#000'})
                    .scale(1.2)
                    .animate(animSettings)
                    .rotate((360 / amount) * amount/2)
      
      let triCoord1 = `
        ${center.x - ((size/2)*Math.sqrt(3)) - size},${center.y - (size/2)} 
        ${center.x - ((size/2)*Math.sqrt(3))},${center.y - (size/2)} 
        ${center.x - ((size/2)*Math.sqrt(3)) - (size/2)},${center.y - (size/2) - (size/2)*Math.sqrt(3)} 
      `
      let triCoord2 = `
        ${center.x - ((size/2)*Math.sqrt(3)) - size},${center.y + (size/2)} 
        ${center.x - ((size/2)*Math.sqrt(3))},${center.y + (size/2)} 
        ${center.x - ((size/2)*Math.sqrt(3)) - (size/2)},${center.y + (size/2) + (size/2)*Math.sqrt(3)} 
      `
      let tri1 = nest.polygon(triCoord1)
        .fill({opacity: 0.2, color: colors[randomNum(3,colors.length)]})
        .stroke({width: 2, color: '#000'})
      let tri2 = nest.polygon(triCoord2)
        .fill({opacity: 0.2, color: colors[randomNum(3,colors.length)]})
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

  let rotateSquares = (nest) => {
    let children = nest.children()
    for (let i=0; i<children.length; i++) {
      children[i].animate(animSettings)
                .rotate(((-90 * (i+1)) / amount) * amount)
    }
  }


  draw.filterWith(function(add) {
    var blur = add.gaussianBlur(5)
    add.blend(add.$source, blur)
  })

  initPoints()
    .then(initColors())
    .then(points.forEach(point => {
      drawSquares(point)
      drawTri(point)
    }))
}