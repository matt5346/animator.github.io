<template>
  <div class="main">
    <div class="container">
      <div class="title__box">
        <h1 class="section-title">
          Create animation
        </h1>
        <div class="change_layout_box">
          <span class="change_layout_box__text">Switch layout</span>
          <label class="switch" for="checkbox" @change="changeLayout">
            <input id="checkbox" type="checkbox">
            <div class="slider round" />
          </label>
        </div>
      </div>
      <div class="main-settings">
        <button
          class="main-btn"
          @click="addPlaceholder"
        >
          Add img
        </button>
        <button
          class="main-btn"
          @click="removePlaceholder"
        >
          Remove img
        </button>

      </div>

      <div class="create-box">
        <div :class="['create-box__left', layout ? 'create-box__left--full' : '']">
          <h2 class="section-title">
            Load and customize
          </h2>
          <createBox
            v-for="(item, key) in counter"
            :key="key"
            :counter="key"
            @loaded-img="loadedImg"
            @loaded-img-size="loadedImgSize"
            @remove-file="removeFile"
            @style-changed="styleChanged"
            @keyframe-add="keyframeAdd"
            @size-changed="sizeChanged"
            @position-changed="positionChanged"
          />
        </div>
        <div :class="['create-box__right', layout ? 'create-box__right--full' : '']">
          <h2 class="section-title">
            Watch result
          </h2>
          <transition v-if="fileDecode.length !== 0" name="slide-fade">
            <div class="svg-container">
              <svg xmlns="http://www.w3.org/2000/svg" class="svg-result" :viewBox="viewBoxValue" :width="imgWidth" :height="imgHeight">
                <style v-for="(item, key) in imgAnimations" :key="key">
                    {{ item }}
                </style>
                <imgTemplate
                  :fileDecode="fileDecode"
                  :keyframe="direction"
                />
              </svg>
            </div>
          </transition>
          <h2 class="section-title" v-if="fileDecode.length !== 0">
            Styles
          </h2>
          <p v-for="(item, key) in imgAnimations" :key="key">
            {{ item }}
          </p>
          <button
            v-if="fileDecode.length !== 0"
            class="main-btn"
            @click="saveImg"
          >
            Save Img
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import createBox from '@/components/createBox-left/index'
import imgTemplate from '@/common-components/img/index'

export default {
  name: 'Create1',
	components: {
    createBox,
    imgTemplate
  },
	data () {
		return {
      downloadFile: null,
			layout: false,
			fileDecode: [],
			imgWidth: 0,
      imgHeight: 0,
      customSize: [],
      imgAnimations: [],
      styleObj: [],
			styleDirection: [],
      direction: [],
      counter: 1
		}
	},
	computed: {
		fileDecodeValue () {
			return (this.fileDecode) ? this.fileDecode : ''
		},
		viewBoxValue () {
			return 0 + ' ' + 0 + ' ' + this.imgWidth + ' ' + this.imgHeight
    }
  },
  watch: {
    imgAnimations(oldV, newV) {
      console.log(oldV, newV)
    }
  },
	methods: {
    // setting imgObj in fileDecode individual styles
    sizeChanged (customWidth, customHeight, xPosition, yPosition, counter) {
      this.fileDecode[counter].realHeight = customHeight
      this.fileDecode[counter].realWidth = customWidth
    },
    positionChanged (xPosition, yPosition, counter) {
      this.fileDecode[counter].xSize = xPosition
      this.fileDecode[counter].ySize = yPosition
    },
		changeLayout () {
			this.layout = !this.layout
    },
    // passing data from createBox-left----
    loadedImg (file, counter) {
      let imgObj = {
        imgHref: file,
        animation: this.direction[counter],
        realWidth: null,
        realHeight: null,
        xSize: 0,
        ySize: 0
      }
      this.fileDecode.push(imgObj)
    },
    // passing size of img from createBox-left----
    loadedImgSize (size) {
      this.imgWidth = size[0]
      this.imgHeight = size[1]
    },
    removeFile (remover) {
      this.fileDecode = remover
    },
    // passing styles of IMAGE animation from createBox-left radio and range inputs----
    styleChanged (styles, keyframeObj, counter) {
      let keyframeStyle = `@keyframes ${keyframeObj.keyframe} { 0% { transform: translate(${keyframeObj.value1}px, 0) } 50% { transform: translate(${keyframeObj.value2}px, 0) } 100% { transform: translate(${keyframeObj.value3}px, 0 )} }`
      // if no items in style array
      if (this.imgAnimations.length === 0) {
        this.imgAnimations.push(keyframeStyle)
        this.styleObj.push(keyframeObj)
      } else {
        // if more then one item
        if (this.styleObj.length < (counter + 1)) {
          // console.log('this.styleObj.length < (counter + 1)', '===', 'TRUE')
          this.imgAnimations.push(keyframeStyle)
          this.styleObj.push(keyframeObj)
          // checking previous and current values of keyframe range for dynamic render, otherwise item pushing into array
        } else if (this.styleObj[counter].keyframe === keyframeObj.keyframe
                  && 
                  (this.styleObj[counter].value1 !== keyframeObj.value1
                  || this.styleObj[counter].value2 !== keyframeObj.value2
                  || this.styleObj[counter].value3 !== keyframeObj.value3
                  || this.styleObj[counter].value4 !== keyframeObj.value4)) {
          this.$set(this.imgAnimations, counter, styles)
          this.$set(this.styleObj, counter, keyframeObj)
        } else if (this.styleObj[counter].keyframe !== keyframeObj.keyframe) {
          // console.log('this.styleObj[counter].keyframe !== keyframeObj.keyframe', '===', 'TRUE')
          this.$set(this.imgAnimations, counter, styles)
          this.$set(this.styleObj, counter, keyframeObj)
        }
      }
    },
    // getting directions from createBox-left----
    keyframeAdd (keyframe, counter) {
      // this.$set(this.fileDecode, [counter].animation, keyframe)

      this.fileDecode[counter].animation = keyframe
    },
    addPlaceholder () {
      if (this.counter === 8) {
        return this.counter
      }
      this.counter += 1
    },
    removePlaceholder () {
      if (this.counter === 1) {
        return this.counter
      }
      this.counter -= 1
    },
    saveImg() {
      let img = document.querySelector('.svg-result');
      var oDOM = img.cloneNode(true)
      

      var data = new XMLSerializer().serializeToString(oDOM);
      var svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
      var url = URL.createObjectURL(svg);
      let a      = document.createElement('a');
      // a.href     = 'data:image/svg+xml;charset=utf-8,' + unescape(img.outerHTML);
      var Text = document.createTextNode("Export");
      a.target   = '_blank'
      a.appendChild(Text);
      a.href=url;
      a.download = 'newImg.svg'
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      console.log(oDOM.outerHTML)
    }
	}
}

</script>
<style lang='scss'>
  @import './style.scss';
</style>
