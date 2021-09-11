<template>
  <div>
    <Header />
    <keep-alive>
        <StaffSidebar :dashview=dashtype  />
      </keep-alive>

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import StaffSidebar from '@/components/StaffSidebar.vue';
import Footer from '@/components/Footer.vue';

export default {
  props: {
    dashtype: String,
  },
  components: {
    Header, StaffSidebar, Footer,
  },
};
</script>
