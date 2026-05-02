<template>
  <footer class="footer">
    <div class="footer__inner">

      <!-- Columna marca -->
      <div class="footer__brand">
        <div class="logo">
          <span class="logo__dot"></span>
          DevBlog
        </div>
        <p class="footer__desc">
          Artículos sobre Vue, JavaScript y buenas prácticas
          para developers en crecimiento.
        </p>
        <div class="footer__socials">
          <a href="https://github.com" target="_blank" class="social" title="GitHub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" class="social" title="Twitter">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Columna contenido -->
      <div class="footer__col">
        <h4 class="footer__col-title">Contenido</h4>
        <RouterLink to="/"                    class="footer__link">Todos los posts</RouterLink>
        <RouterLink to="/category/vue"        class="footer__link">Vue</RouterLink>
        <RouterLink to="/category/javascript" class="footer__link">JavaScript</RouterLink>
        <RouterLink to="/category/patrones"   class="footer__link">Patrones</RouterLink>
      </div>

      <!-- Columna info -->
      <div class="footer__col">
        <h4 class="footer__col-title">Info</h4>
        <RouterLink to="/about"   class="footer__link">Acerca de</RouterLink>
        <RouterLink to="/contact" class="footer__link">Contacto</RouterLink>
        <a href="/rss.xml"        class="footer__link">RSS Feed</a>
      </div>

    </div>

    <!-- Copyright -->
    <div class="footer__bottom">
      <span>© {{ currentYear }} DevBlog — hecho con Vue 3 y mucho café</span>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: white;
  border-top: 0.5px solid #e5e5e5;
  margin-top: auto;
}
.footer__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px 24px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}
.logo__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #534AB7;
}
.footer__desc {
  font-size: 13px;
  color: #888;
  line-height: 1.6;
  max-width: 240px;
  margin-bottom: 16px;
}
.footer__socials {
  display: flex;
  gap: 8px;
}
.social {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 0.5px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: border-color 0.15s, color 0.15s;
}
.social:hover { border-color: #534AB7; color: #534AB7; }
.social svg { width: 14px; height: 14px; }
.footer__col-title {
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
}
.footer__link {
  display: block;
  font-size: 13px;
  color: #666;
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.15s;
}
.footer__link:hover { color: #534AB7; }
.footer__bottom {
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px 24px;
  border-top: 0.5px solid #e5e5e5;
  font-size: 12px;
  color: #aaa;
}
</style>