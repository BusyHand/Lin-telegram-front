<template>
  <footer class="footer text-light py-4 mt-auto">
    <div class="container d-flex justify-content-between align-items-center flex-wrap text-muted">
      <span class="copyright">&copy; 2025 ЛИН-лаборатория. Все права защищены.</span>
      <div class="social-icons d-flex align-items-center gap-3 mt-2 mt-sm-0">
        <a href="https://vk.com/smart_lean_group" target="_blank" class="text-light d-flex align-items-center">
          <img src="/src/icons/icons8-vk.svg" alt="VK" class="icon-vk" />
        </a>
        <a href="https://t.me/smart_lean_group" target="_blank" class="d-flex align-items-center">
          <i class="bi bi-telegram fs-3"></i>
        </a>
      </div>
    </div>
  </footer>
</template>


<style scoped>
.footer {
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2));
}

.icon-vk {
  height: 28px;
}

@media (max-width: 576px) {
  .footer .container {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .footer .social-icons {
    justify-content: center;
  }
}
</style>

