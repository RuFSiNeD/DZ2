<template>
  <header>
    <div class="logo-section">
      <NuxtLink to="/">
        <div class="logo">
          <img src="@/assets/public/logo.png" height="49" width="32" alt="Logo"/>
        </div>
      </NuxtLink>
      <h2>YOUR WEDDING PHOTOGRAPHER</h2>
    </div>
    <NuxtLink to="/table">
      <div class="links">
        <img src="@/assets/public/links.png" height="17" width="87" alt="Social Links"/>
      </div>
    </NuxtLink>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>