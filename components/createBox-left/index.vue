<template>
  <div :class="'create-box__loader' + ' create-box__loader' + '--' + counter">
    <div v-if="!file">
      <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
        <div class="dropZone-info" @drag="onChange">
          <span class="dropZone-title">Drop file or click to upload</span>
          <div class="dropZone-upload-limit-info">
            <div>maximum file size: 5 MB</div>
          </div>
        </div>
        <input type="file" @change="onChange">
      </div>
    </div>
    <div v-else class="dropZone-uploaded">
      <div class="dropZone-uploaded-info">
        <span class="dropZone-title">Uploaded</span>
        <button type="button" class="main-btn" @click="removeFile">
          Remove Photo
        </button>
      </div>
    </div>
    <transition name="slide-fade">
      <div v-if="url && file" class="img-preview">
        <div class="accord" @click="accordionToggle">
          <div class="accord__toggle">
            <h3>Image</h3>
          </div>
          <div class="accord__content">
            <img class="uploaded-img" :src="url" alt="">
            <div class="uploadedFile-info">
              <p><b>extension:</b> {{ extension }}</p>
              <p><b>size:</b> {{ file.size / 1000 }} kb ({{ (file.size / 1000000).toString().slice(0, -3) }} mb)</p>
            </div>
            <div class="viewbox-settings">
              <div class="viewbox-settings__input-box">
                <span>Width of img</span>
                <input
                  class="input"
                  type="number"
                  v-model="imgWidth"
                  @input="sizeChanged()"
                />
              </div>
              <div class="viewbox-settings__input-box">
                <span>Height of img</span>
                <input
                  class="input"
                  type="number"
                  v-model="imgHeight"
                  @input="sizeChanged()"
                />
              </div>
              <div class="viewbox-settings__input-box">
                <span>X position of img</span>
                <input
                  class="input"
                  type="number"
                  v-model="yPosition"
                  @input="positionChanged()"
                  @change="positionChanged()"
                />
              </div>
              <div class="viewbox-settings__input-box">
                <span>Y position of img</span>
                <input
                  class="input"
                  type="number"
                  v-model="xPosition"
                  @input="positionChanged()"
                  @change="positionChanged()"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="accord" @click="accordionToggle">
          <div class="accord__toggle">
            <h3>Animations</h3>
          </div>
          <div class="accord__content">
            <div class="animations-box">
              <div class="specify-row">
                <customCheckbox
                  :counter="counter"
                  @target="changeAnimationData"
                />
              </div>
              <div class="specify-row">
                <div class="specify-row__item --full">
                  <input
                    v-model="value1"
                    type="range"
                    min="-1000"
                    max="1000"
                    step="10"
                    @input="animationKeyframe()"
                  >
                  <div class="range-value">
                    First part of keyframe {{ value1 }}
                  </div>
                </div>
              </div>
              <div class="specify-row">
                <div class="specify-row__item --full">
                  <input
                    v-model="value2"
                    type="range"
                    min="-1000"
                    max="1000"
                    step="10"
                    @input="animationKeyframe()"
                  >
                  <div class="range-value">
                    Second part of keyframe {{ value2 }}
                  </div>
                </div>
              </div>
              <div class="specify-row">
                <div class="specify-row__item --full">
                  <input
                    v-model="value3"
                    type="range"
                    min="-1000"
                    max="1000"
                    step="10"
                    @input="animationKeyframe()"
                  >
                  <div class="range-value">
                    Third part of keyframe {{ value3 }}
                  </div>
                </div>
              </div>
              <div class="specify-row">
                <div class="specify-row__item --full">
                  <input
                    v-model="value4"
                    type="range"
                    min="-1000"
                    max="1000"
                    step="10"
                    @input="animationKeyframe()"
                  >
                  <div class="range-value">
                    Fourth part of keyframe {{ value4 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import customCheckbox from '@/common-components/customCheckbox/index'
export default {
  name: 'CreateBoxLeft',
  components: {
    customCheckbox
  },
  props: {
    counter: Number
  },
	data () {
		return {
			file: '',
			dragging: false,
			url: null,
			fileDecode: null,
			ltrAnimation: false,
			rtlAnimation: false,
			addPause: false,
			value1: 0,
			value2: 0,
			value3: 0,
			value4: 0,
			style1: null,
      direction: '',
      imgWidth: 0,
      imgHeight: 0,
      xPosition: 0,
      yPosition: 0
		}
  },
  watch: {
    value() {
      this.$emit('rangeValue1', this.value1)
    }
  },
	computed: {
		extension () {
			return (this.file) ? this.file.name.split('.').pop() : ''
    }
	},
	methods: {
    sizeChanged() {
      this.$emit('size-changed', this.imgWidth, this.imgHeight, this.counter)
    },
    positionChanged() {
      this.$emit('position-changed',this.xPosition, this.yPosition, this.counter)
    },
		accordionToggle (e) {
			const accordWrap = document.querySelectorAll('.accord')
			const accordToggler = document.querySelectorAll('.accord__toggle')

			for (let i = 0; i < accordWrap.length; i++) {
				if (accordWrap[i].contains(e.target) && accordToggler[i].contains(e.target)) {
					accordWrap[i].classList.toggle('active')
				}
			}
		},
		animationInlineStyle () {
      console.log('animationInlineStyle')

			if (this.ltrAnimation) {
				this.value1 = -300
				this.value2 = 0
				this.value3 = 100
				this.direction = 'ltr'
			}
			if (this.addPause) {
				this.value1 = -300
				this.value2 = 0
				this.value3 = 15
				this.value4 = 100
				this.direction = 'ltr'
			}
			if (this.rtlAnimation) {
				this.value1 = 300
				this.value2 = 0
				this.value3 = -100
				this.direction = 'rtl'
			}
		},
		animationKeyframe () {
        let keyframeObj = {
          keyframe: this.keyframe,
          value1: this.value1,
          value2: this.value2,
          value3: this.value3,
          value4: this.value4
        }
        let keyframeStyle = `@keyframes ${this.keyframe} { 0% { transform: translate(${this.value1}px, 0) } 50% { transform: translate(${this.value2}px, 0) } 100% { transform: translate(${this.value3}px, 0 )} }`
        this.$emit('style-changed', keyframeStyle, keyframeObj, this.counter)
        console.log(keyframeStyle, 'animationKeyframe')
		},
		onChange (e) {
			const files = e.target.files || e.dataTransfer.files
			const file = e.target.files[0]
			this.url = URL.createObjectURL(file)

			if (!files.length) {
				this.dragging = false
				return
			}
			this.createFile(files[0])
		},
		createFile (file) {
			if (file.size > 5000000) {
				alert('please check file size no over 5 MB.')
				this.dragging = false
				return
			}
			this.file = file
			this.dragging = false

			const fr = new FileReader()
			fr.readAsDataURL(file)

			fr.addEventListener('load', function (e) {
				const newFr = fr.result.toString()

				this.fileDecode = newFr
        this.$emit('loaded-img', newFr, this.counter)

				const img = document.querySelectorAll('.uploaded-img')
				// receiving loaded image intrinsic value, for svg viewbox
				const imgChildWidth = img[0].width
        const imgChildHeight = img[0].height
        
        this.$emit('loaded-img-size', [imgChildWidth, imgChildHeight])
			}.bind(this))
		},
		removeFile () {
			this.file = ''
      this.$emit('remove-file', [])
		},
		changeAnimationData (target, dir) {
        this.keyframe = target
        console.log('DIRECTION', dir)
        if (dir === 'rtl') {
          this.rtlAnimation = true
          this.addPause = false
          this.ltrAnimation = false
        }
        if (dir === 'ltr') {
          this.ltrAnimation = true
          this.addPause = false
          this.rtlAnimation = false
        }
        if (dir === 'addPause') {
          this.addPause = true
          this.rtlAnimation = false
          this.ltrAnimation = false
        }

        this.animationInlineStyle()
        this.animationKeyframe()
        this.$emit('keyframe-add', target, this.counter)
		}
	}
}
</script>
