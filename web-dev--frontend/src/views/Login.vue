<template>
  <div>
    <Header />
    <Login />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Login from '@/components/Login.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header, Login, Footer,
  },
};
</script>
