let width, height, canvas, ctx, points, target, animateHeader = true

const initHeader = (canvas, w, h) => {
  width = w || window.clientWidth
  height = h || (window.clientHeight > 560 ? window.clientHeight : 560)
  target = {
    x: width / 2, 
    y: height / 2
  }
  canvas.width = width
  canvas.height = height
  ctx = canvas.getContext('2d')

  // create points
  points = []
  for (let x = 0; x < width; x = x + width / 20) {
    for (let y = 0; y < height; y = y + height/20) {
      const px = x + Math.random() * width / 20
      const py = y + Math.random() * height / 20
      points.push({
        x: px, 
        originX: px, 
        y: py, 
        originY: py 
      })
    }
  }

  // for each point find the 5 closest points
  for (let i = 0; i < points.length; i++) {
    let closest = []
    let p1 = points[i]
    for (let j = 0; j < points.length; j++) {
      let p2 = points[j]
      if (p1 !== p2) {
        let placed = false
        for (let k = 0; k < 5; k++) {
          if (!placed) {
            if (closest[k] === undefined) {
              closest[k] = p2
              placed = true
            }
          }
        }

        for(let k = 0; k < 5; k++) {
          if (!placed) {
            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
              closest[k] = p2
              placed = true
            }
          }
        }
      }
    }
    p1.closest = closest
  }

  // assign a circle to each point
  for (let i in points) {
    let c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)')
    points[i].circle = c
  }
}

// Event handling
const addListeners = () => {
  window.addEventListener('mousemove', mouseMove)
  window.addEventListener('scroll', scrollCheck)
}

const mouseMove = e => {
  let posx = 0
  let posy = 0
  if (e.pageX || e.pageY) {
    posx = e.pageX
    posy = e.pageY
  }
  else if (e.clientX || e.clientY)  {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
  }
  target.x = posx
  target.y = posy
}

const scrollCheck = () => document.body.scrollTop > height ? animateHeader = false : animateHeader = true

// animation
const initAnimation = () => {
  animate()
  for(let i in points) {
    shiftPoint(points[i])
  }
}

const animate = () => {
  if(animateHeader) {
    ctx.clearRect(0, 0, width, height)
    for (let i in points) {
      // detect points in range
      if (Math.abs(getDistance(target, points[i])) < 4000) {
        points[i].active = 0.15
        points[i].circle.active = 0.3
      } else if (Math.abs(getDistance(target, points[i])) < 20000) {
        points[i].active = 0.05
        points[i].circle.active = 0.15
      } else if (Math.abs(getDistance(target, points[i])) < 40000) {
        points[i].active = 0.01
        points[i].circle.active = 0.05
      } else {
        points[i].active = 0
        points[i].circle.active = 0
      }
      drawLines(points[i])
      points[i].circle.draw()
    }
  }
  requestAnimationFrame(animate)
}

const shiftPoint = p => {
  TweenLite.to(p, 1 + 1 * Math.random(), {
    x: p.originX - 50 + Math.random() * 100,
    y: p.originY - 50 + Math.random() * 100, 
    ease: Circ.easeInOut,
    onComplete() {
      shiftPoint(p)
    }
  })
}

// Canvas manipulation
const drawLines = p => {
  if (!p.active) 
    return
  for(let i in p.closest) {
    ctx.beginPath()
    ctx.moveTo(p.x, p.y)
    ctx.lineTo(p.closest[i].x, p.closest[i].y)
    ctx.strokeStyle = `rgba(255, 255, 255, ${p.active})`
    ctx.stroke()
  }
}

function Circle (pos, rad, color) {
  this.pos = pos || null
  this.radius = rad || null
  this.color = color || null
}

Circle.prototype.draw = function () {
  if (!this.active) 
    return
  ctx.beginPath()
  ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false)
  ctx.fillStyle = `rgba(255, 255, 255, ${this.active})`
  ctx.fill()
}

// Util
const getDistance = (p1, p2) => Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)

// Main
export default (canvas, w, h) => {
  initHeader(canvas, w, h)
  initAnimation()
  addListeners()
}