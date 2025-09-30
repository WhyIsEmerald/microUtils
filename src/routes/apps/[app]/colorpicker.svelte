<script lang="ts">
  let alpha = 255
  let canvas: HTMLCanvasElement
  let mouseX = 0
  let mouseY = 0
  let isMouseDown = false

  // Picked color RGB values
  let pickedColors = {
    red: 0,
    green: 0,
    blue: 0
  }

  // Brightness slider value (0-100) and normalized brightness (0-1)
  let brightnessSlider = 100
  let brightness = 1

  // Color code outputs
  let hexColor = '#000000'
  let rgbColor = 'rgb(0, 0, 0)'
  let hslColor = 'hsl(0, 0%, 0%)'

  // Convert HSV to RGB
  function hsvToRgb(h: number, s: number, v: number) {
    let r, g, b
    let i = Math.floor(h * 6)
    let f = h * 6 - i
    let p = v * (1 - s)
    let q = v * (1 - f * s)
    let t = v * (1 - (1 - f) * s)
    switch (i % 6) {
      case 0:
        ;((r = v), (g = t), (b = p))
        break
      case 1:
        ;((r = q), (g = v), (b = p))
        break
      case 2:
        ;((r = p), (g = v), (b = t))
        break
      case 3:
        ;((r = p), (g = q), (b = v))
        break
      case 4:
        ;((r = t), (g = p), (b = v))
        break
      case 5:
        ;((r = v), (g = p), (b = q))
        break
      default:
        ;((r = 0), (g = 0), (b = 0))
        break
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  }

  // Convert RGB to Hex
  function rgbToHex(r: number, g: number, b: number) {
    return (
      '#' +
      [r, g, b]
        .map(x => {
          const hex = x.toString(16)
          return hex.length === 1 ? '0' + hex : hex
        })
        .join('')
    )
  }

  // Convert RGB to HSL
  function rgbToHsl(r: number, g: number, b: number) {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  }

  // Draw the color wheel circle with brightness applied
  function drawCircle(
    radius: number,
    data: Uint8ClampedArray,
    ctx: CanvasRenderingContext2D,
    image: ImageData,
    brightness: number
  ) {
    for (let x = -radius; x < radius; x++) {
      for (let y = -radius; y < radius; y++) {
        const distance = Math.sqrt(x * x + y * y)
        if (distance > radius) continue

        const saturation = distance / radius
        const arctan = Math.atan2(y, x)
        const hue = (arctan + Math.PI) / (2 * Math.PI)
        const [red, green, blue] = hsvToRgb(hue, saturation, brightness)

        const adjustedX = x + radius
        const adjustedY = y + radius
        const index = (adjustedY * canvas.width + adjustedX) * 4

        data[index] = red
        data[index + 1] = green
        data[index + 2] = blue
        data[index + 3] = alpha
      }
    }
    ctx.putImageData(image, 0, 0)
  }

  // Update the selector circle and picked color on mouse interaction
  function updateSelector(
    clientX: number,
    clientY: number,
    data: Uint8ClampedArray,
    radius: number
  ) {
    const x = clientX - canvas.offsetLeft
    const y = clientY - canvas.offsetTop
    const index = (y * canvas.width + x) * 4

    const red = data[index]
    const green = data[index + 1]
    const blue = data[index + 2]

    pickedColors.red = red
    pickedColors.green = green
    pickedColors.blue = blue

    // Remove previous custom mouse selectors
    document.querySelectorAll('.custom-mouse').forEach(el => el.remove())

    // Draw a custom mouse selector circle
    const mouse = document.createElement('div')
    mouse.style.width = '20px'
    mouse.style.height = '20px'
    mouse.style.borderRadius = '50%'
    mouse.style.border = '2px solid black'
    mouse.style.position = 'absolute'
    mouse.style.left = clientX - 10 + 'px'
    mouse.style.top = clientY - 10 + 'px'
    mouse.style.backgroundColor = `rgb(${red},${green},${blue})`
    mouse.classList.add('custom-mouse')
    document.body.appendChild(mouse)
  }

  // Reactive: redraw the color wheel whenever canvas or brightness changes
  $: if (canvas) {
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const radius = canvas.width / 2
      const image = ctx.createImageData(canvas.width, canvas.height)
      const data = image.data

      drawCircle(radius, data, ctx, image, brightness)

      // Remove previous event listeners to avoid duplicates
      document.onmousedown = null
      document.onmousemove = null
      document.onmouseup = null

      // Mouse down event
      document.addEventListener('mousedown', event => {
        mouseX = event.clientX
        mouseY = event.clientY

        if (
          mouseX > canvas.offsetLeft &&
          mouseX < canvas.offsetLeft + canvas.width &&
          mouseY > canvas.offsetTop &&
          mouseY < canvas.offsetTop + canvas.height &&
          Math.sqrt(
            Math.pow(mouseX - (canvas.offsetLeft + radius), 2) +
              Math.pow(mouseY - (canvas.offsetTop + radius), 2)
          ) <= radius
        ) {
          isMouseDown = true
          updateSelector(mouseX, mouseY, data, radius)
        }
      })

      // Mouse move event (only when mouse is down)
      document.addEventListener('mousemove', event => {
        if (!isMouseDown) return

        mouseX = event.clientX
        mouseY = event.clientY

        if (
          mouseX > canvas.offsetLeft &&
          mouseX < canvas.offsetLeft + canvas.width &&
          mouseY > canvas.offsetTop &&
          mouseY < canvas.offsetTop + canvas.height &&
          Math.sqrt(
            Math.pow(mouseX - (canvas.offsetLeft + radius), 2) +
              Math.pow(mouseY - (canvas.offsetTop + radius), 2)
          ) <= radius
        ) {
          updateSelector(mouseX, mouseY, data, radius)
        }
      })

      // Mouse up event
      document.addEventListener('mouseup', () => {
        isMouseDown = false
      })
    }
  }

  // Update brightness when slider changes
  $: brightness = brightnessSlider / 100

  // Update color code outputs when picked color changes
  $: hexColor = rgbToHex(
    pickedColors.red,
    pickedColors.green,
    pickedColors.blue
  )
  $: rgbColor = `rgb(${pickedColors.red}, ${pickedColors.green}, ${pickedColors.blue})`
  $: hslColor = rgbToHsl(
    pickedColors.red,
    pickedColors.green,
    pickedColors.blue
  )

  // when i go to another page delete the custom mouse
  import { onDestroy } from 'svelte'

  onDestroy(() => {
    document.querySelectorAll('.custom-mouse').forEach(el => el.remove())
  })
</script>

<div
  class="flex min-h-screen flex-grow gap-5 items-center justify-center flex-col lg:flex-row"
>
  <div
    class="flex flex-col gap-5 items-center justify-center w-full lg:w-1/2 min-h-screen"
  >
    <canvas
      bind:this={canvas}
      class="rounded-full border-2 border-white"
      width="300"
      height="300"
    ></canvas>
  </div>

  <div
    class="flex min-h-screen w-full lg:w-1/2 gap-5 items-center justify-center flex-col bg-base-300 p-6"
  >
    <div
      class="rounded-full w-16 h-16 border border-gray-600"
      style="background-color: rgb({pickedColors.red}, {pickedColors.green}, {pickedColors.blue});"
    ></div>

    <div class="flex flex-col gap-1 items-center">
      <div class="text-xs">Hex: <span>{hexColor}</span></div>
      <div class="text-xs">RGB: <span>{rgbColor}</span></div>
      <div class="text-xs">HSL: <span>{hslColor}</span></div>
    </div>

    <input
      type="range"
      class="range range-xs range-primary"
      min="0"
      max="100"
      bind:value={brightnessSlider}
    />
    <span class="text-xs mt-2">Brightness</span>
  </div>
</div>

<style>
</style>
