<template>
  <teleport to="body">
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h3>Приглашение в компанию</h3>
        <div class="qr-wrapper" ref="cardRef">
          <img :src="`http://localhost:9000/images/${linkData.qrName}`" alt="QR Code" />
          <p>{{ linkData.link }}</p>
        </div>
        <div class="actions">
          <button @click="copyLink" class="btn btn-outline-primary">Копировать ссылку</button>
          <button @click="downloadCardAsImage" class="btn btn-outline-success">Скачать QR</button>
          <button @click="close" class="btn btn-outline-secondary">Закрыть</button>
        </div>
      </div>
    </div>
  </teleport>

</template>

<script setup>
import { ref, nextTick } from 'vue'
import { toJpeg } from 'html-to-image'

const props = defineProps({
  visible: Boolean,
  linkData: Object,
})

const emit = defineEmits(['close'])

const cardRef = ref(null)

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(props.linkData.link)
    alert('Ссылка скопирована!')
  } catch (e) {
    console.error('Ошибка копирования:', e)
  }
}

const close = () => emit('close')

const downloadCardAsImage = async () => {
  await nextTick()
  if (!cardRef.value) return

  toJpeg(cardRef.value, {
    quality: 0.95,
    backgroundColor: null,
    cacheBust: true,
    pixelRatio: 2,
  }).then((dataUrl) => {
    const link = document.createElement('a')
    link.download = 'invite-qr.jpg'
    link.href = dataUrl
    link.click()
  }).catch((error) => {
    console.error('Ошибка при создании изображения:', error)
  })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 120px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 12px;
  overflow-y: auto;
}

.modal-content {
  background-color: white;
  padding: 16px;
  border-radius: 10px;
  width: 100%;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  margin-top: auto;
  margin-bottom: auto;
}

.qr-wrapper {
  margin-bottom: 12px;
}

.qr-wrapper img {
  max-width: 100%;
  height: auto;
  margin-bottom: 6px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

</style>
