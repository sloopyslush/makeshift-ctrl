<script setup lang="ts">
import { array } from 'blockly/core/utils';
import { rndrCtrlAPI } from 'src/renderer';
import { ref, inject } from 'vue';

const makeshiftApi = inject('makeshift') as rndrCtrlAPI
let themeList = inject('theme-list') as any
// makeshiftApi.test()
const path = ref('')

themeList.value = [
{cssClass: 'ark-theme',
isLight: false,
cssRaw: `.ark-theme {
    --color-bg: 36 34 40;
    --color-dark: 23 23 28;
    --color-neutral: 152 147 141;
    --color-text: 238 231 221;
    --color-text-primary-contrast: 36 34 40;
    --color-hl: 66 63 61;
    --color-hl1: 224 212 204;
    --color-primary: 214 178 235;
    --color-primary1: 163 112 183;
    --color-primary2: 128 75 149;
    --color-secondary: 199 78 41;
    --color-secondary1: 255 154 122;
    --color-secondary2: 255 177 153;
    --color-red: 190 91 112;
    --color-green: 167 192 123;
    --color-blue: 170 206 222;
  }`}, 
{cssClass: "lht-theme",
isLight: true,
cssRaw: `.lht-theme {
    --color-bg: 238 231 221;
    --color-dark: 243 243 230;
    --color-neutral: 152 147 141;
    --color-text: 1 1 8;
    --color-text-primary-contrast: 238 231 221;
    --color-hl: 224 212 204;
    --color-hl1: 36 34 40;
    --color-primary: 199 78 41;
    --color-primary1: 255 154 122;
    --color-primary2: 255 177 153;
    --color-secondary: 214 178 235;
    --color-secondary1: 163 112 183;
    --color-secondary2: 128 75 149;
    --color-red: 187 42 73;
    --color-green: 88 138 0;
    --color-blue: 0 122 196;
}`}]

console.log(themeList)

 function storeTheme(path:string){
  let themeObj:any = {}
  const themeResponse = makeshiftApi.get.themeFromPath(path)
  
  themeResponse.then((result) => {
  themeObj["cssClass"] = result.cssClass
  themeObj["isLight"] = result.isLight
  themeObj["cssRaw"] = result.cssRaw
  console.log(result)
  const checkTheme = themeList.value.find((theme:any) => theme.cssClass===themeObj.cssClass)
if(checkTheme===undefined){
  themeList.value.push(themeObj)
}
}).catch((error) => {
  console.error(error)
})

  console.log("1")
  console.log(themeList)
  console.log("2")
  console.log(themeObj)
  console.log("3")
  console.log(`cssclass: ${themeObj.cssClass}`)
}

const selectedTheme=ref()
/*function removeTheme() {
  const themeStyle = document.querySelector('.colorblind-light-theme');
        if (themeStyle) {
          document.head.removeChild(themeStyle);
        }
  const arr = [...themeList.value]
  console.log(`1 themeList before: ${themeList.value}`)
  arr.filter(theme => theme.cssClass!==selectedTheme)
  themeList.value=arr
  console.log(`2 themeList after: ${themeList.value}`)
}*/

async function handleGetThemeFromPath(path: string) {
  makeshiftApi.get.themeFromPath(path)
}
</script>

<template>
  <span>
    <input
      v-model="path"
      class="inline mx-3"
    />
    <button
      @click="handleGetThemeFromPath(path)"
      class="inline mx-3"
    >
      get theme from path
    </button>
    <button
      @click="makeshiftApi.test('asdf')"
      class="inline mx-3"
    >
      call test()
    </button>
    <button
      @click="storeTheme(path)"
      class="inline mx-3"
    >
      Add to theme list
    </button>
  <!-- <div>
      <select
			v-model="selectedTheme"
    >
			 <option v-for="theme in themeList" :value="theme.cssClass">{{ theme.cssClass }}</option>
		  </select>
     <button
        @click="removeTheme()"
        class="inline mx-3"
      >
        remove theme
      </button>
    </div>-->
  </span>
</template>

<style></style>