<template>
  <g class="img-wrapper">
      <image
        v-for="(item, key) in fileDecode"
        :key="key"
        :xlink:href="item.imgHref"
        :style="`width: ${item.realWidth}px; height: ${item.realHeight}px; transform: translate(${item.xSize}px, ${item.ySize}px); animation: 5s linear 1000000 both ${item.animation}`"
      />
  </g>
</template>

<script>
export default {
  name: 'imgTemplate',
  props: [
    'fileDecode',
    'keyframe'
  ],
  mounted() {
    console.log(this.fileDecode, 'COMPONENT FILE DECODE')
  }
}
//  
</script>
