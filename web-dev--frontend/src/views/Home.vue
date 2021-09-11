<template>
  <div>
    <Header />
    <LandingPage />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import LandingPage from '@/components/LandingPage.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Header, LandingPage, Footer,
  },
};
</script>
