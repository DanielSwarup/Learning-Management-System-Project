<template>
  <div>
    <Header />
    <keep-alive>
        <Sidebar :dashview=dashtype />
    </keep-alive>

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Footer from '@/components/Footer.vue';

export default {
  props: {
    dashtype: String,
  },
  components: {
    Header, Sidebar, Footer,
  },
};
</script>
