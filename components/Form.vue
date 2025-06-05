<template>
  <div class="form-header">
    <h1>YOUR WEDDING PHOTOGRAPHER</h1>
  </div>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <BaseInput v-model="formData.name" placeholder="Name" :onlyLetters="true"/>
      <span v-for="(error, index) in v$.name.$errors" :key="'name-' + index">{{ error.$message }}</span>
      <BaseInput v-model="formData.phone" placeholder="Phone" id="phone" mask="+{7}(000)000-00-00"/>
      <span v-for="(error, index) in v$.phone.$errors" :key="'phone-' + index">{{ error.$message }}</span>
      <BaseInput v-model="formData.email" type="email" placeholder="Email"/>
      <span v-for="(error, index) in v$.email.$errors" :key="'email-' + index">{{ error.$message }}</span>
      <BaseInput v-model="formData.message" type="textarea" placeholder="Message"/>
      <span v-for="(error, index) in v$.message.$errors" :key="'message-' + index">{{ error.$message }}</span>
      <Button type="submit">CONTACT US</Button>
    </form>
    <div v-if="showSurvey" class="modal-overlay">
      <WeddingSurvey @finish="handleSurveyFinish" />
    </div>
    <InfiniteSlider :images="sliderImages" />
  </div>
</template>

<script setup>
import BaseInput from "@/components/BaseInput.vue";
import WeddingSurvey from "@/components/WeddingSurvey.vue";
import InfiniteSlider from "@/components/InfiniteSlider.vue";
import {reactive, computed, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {required, minLength, maxLength, email, numeric} from "@vuelidate/validators";

const showSurvey = ref(false);

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    showSurvey.value = true;
  }
}

function handleSurveyFinish(answers) {
  showSurvey.value = false;
  // Здесь можно обработать ответы опроса, например, отправить их на сервер
}

const formData = reactive({
  name: "",
  phone: "",
  email: "",
  message: "",
});

const rules = computed(() => {
  return {
    name: {required, minLength: minLength(2), maxLength: maxLength(15)},
    phone: {required},
    email: {required, email},
    message: {required: false, maxLength: maxLength(100)},
  }
});

const v$ = useVuelidate(rules, formData);

function CustomAlert(){
  this.alert = function(message,title){
    document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');

    let winH = window.innerHeight;
    dialogoverlay.style.height = winH+"px";

    dialogbox.style.top = "100px";

    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";

    document.getElementById('dialogboxhead').style.display = 'block';

    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    document.getElementById('dialogboxbody').innerHTML = message;
    document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="customAlert.ok()">OK</button>';
  }

  this.ok = function(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }
}

let customAlert = new CustomAlert();
if (typeof window !== 'undefined') {
  window.customAlert = customAlert;
}

const images = import.meta.glob('@/assets/public/slider/*.{jpg,png,jpeg,gif,webp}', {eager: true, import: 'default'});
const sliderImages = Object.values(images);
</script>
<style>
@import "~/assets/styles/alert.css";
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>