let tess1 = () => {

  let amount = 6
  let baseSize = 150

  let points = []
  let smallPoints = []
  let initPoints = () => {
    return new Promise(() => {
      for (let i=0; i<(screen.width / baseSize)+1; i++) {
        for (let j=0; j<(screen.height / baseSize)+1; j++) {
          points.push({
            x: i * baseSize, 
            y: j * baseSize 
          })
          smallPoints.push({
            x: (i * baseSize) + (baseSize / 2),
            y: (j * baseSize) + (baseSize / 2)
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
            .scheme('contrast')   
            .variation('pastel')
            .distance(Math.random())
      colors = scheme.colors();
      for (let i=0; i<colors.length; i++) {
        colors[i] = '#' + colors[i]
      }
    })
  }
  
  let drawSquares = (center) => {
    return new Promise(() => {
      let nest = draw.nested()
      for (let i=0; i<amount; i++) {
        let size = baseSize - (i * (baseSize/amount))
        nest.rect(size, size)
            .fill({opacity: 0.2, color: colors[i]})
            .stroke({width: 2, color: '#000'})
            .attr({ 
              x: center.x - size / 2,
              y: center.y - size / 2
            })      
      }
      rotateSquares(nest)
    })
  }
  
  let smallSquares = (center) => {
    let size = baseSize - (baseSize/amount)
    let nest = draw.nested()
    nest.rect(size, size)
        .fill({opacity: 0.1, color: colors[Math.floor(amount)/2] })
        .stroke({opacity: 0.7, width: 3, color: '#000'})
        .attr({ 
          x: center.x - size / 2,
          y: center.y - size / 2
        })      
        .rotate(33)
    rotateSquares2(nest)
  }
  
  let animSettings = {
    duration: 50000,
    swing: false,
    times:5,
    delay:1000
  }

  let rotateSquares = (nest) => {
    let children = nest.children()
    for (let i=0; i<children.length; i++) {
      children[i].animate(animSettings)
                 .rotate(((90 * (i+1)) / amount) * amount)
    }
  }
  
  let rotateSquares2 = (nest) => {
    let children = nest.children()
    for (let i=0; i<children.length; i++) {
      children[i].animate(animSettings)
                 .rotate(((90 * (i+1)) / amount) * (-1 * amount))
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
    }))
    .then(smallPoints.forEach(point=>{
      smallSquares(point)
    }))
}

