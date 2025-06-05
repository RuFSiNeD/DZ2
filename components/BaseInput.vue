<template>
  <div class="input-wrap">
    <label v-if="label">{{ label }}</label>
    <input 
      type="text" 
      :value="modelValue" 
      @input="handleInput" 
      :placeholder="placeholder"
      v-bind="$attrs"
      ref="input"
    >
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import IMask from 'imask';

const props = defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
  mask: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  onlyLetters: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['update:modelValue']);
const input = ref(null);
let maskInstance = null;

const handleInput = (event) => {
  let value = event.target.value;
  // Фильтрация для поля только букв
  if (props.onlyLetters) {
    value = value.replace(/[^A-Za-zА-Яа-яЁё\s]/g, '');
    if (input.value && input.value.value !== value) {
      input.value.value = value;
    }
  }
  emit('update:modelValue', value);
};

onMounted(() => {
  if (props.onlyLetters) {
    if (maskInstance) {
      maskInstance.destroy();
      maskInstance = null;
    }
    if (input.value) {
      input.value.value = props.modelValue.replace(/[^A-Za-zА-Яа-яЁё\s]/g, '');
    }
    return;
  }
  if (props.mask && input.value) {
    maskInstance = IMask(input.value, {
      mask: props.mask,
      definitions: {
        'A': {
          mask: /[A-Za-zА-Яа-яЁё\s]/
        }
      }
    });
    maskInstance.on('accept', () => {
      emit('update:modelValue', maskInstance.value);
    });
  }
});

watch(() => props.modelValue, (newValue) => {
  if (maskInstance && newValue !== maskInstance.value) {
    maskInstance.value = newValue;
  }
});

onBeforeUnmount(() => {
  if (maskInstance) {
    maskInstance.destroy();
    maskInstance = null;
  }
});
</script>