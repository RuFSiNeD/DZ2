<template>
  <div class="form-header">
    <h1>YOUR WEDDING PHOTOGRAPHER</h1>
  </div>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <BaseInput v-model="formData.name" placeholder="Name"/>
      <span v-for="error in v$.name.$errors">{{ error.$message }}</span>
      <BaseInput v-model="formData.phone" placeholder="Phone" id="phone"/>
      <span v-for="error in v$.phone.$errors">{{ error.$message }}</span>
      <BaseInput v-model="formData.email" type="email" placeholder="Email"/>
      <span v-for="error in v$.email.$errors">{{ error.$message }}</span>
      <BaseInput v-model="formData.message" type="textarea" placeholder="Message"/>
      <span v-for="error in v$.message.$errors">{{ error.$message }}</span>
      <Button type="submit">CONTACT US</Button>
    </form>
  </div>
</template>

<script setup>
import BaseInput from "@/components/BaseInput.vue";
import {reactive, computed} from "vue";
import useVuelidate from "@vuelidate/core";
import {required, minLength, maxLength, email, numeric} from "@vuelidate/validators";

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    customAlert.alert('This is a custom alert without heading.')
  }
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
    phone: {required, numeric},
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
</script>
<style>
@import "~/assets/styles/alert.css";
</style>