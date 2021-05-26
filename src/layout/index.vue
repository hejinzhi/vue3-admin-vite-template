<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <pre>{{ sidebar }}</pre>

      <pre>{{ classObj }}</pre>

      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { computed, defineComponent, reactive, toRef } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  // computed: {
  //   sidebar() {
  //     return this.$store.state.app.sidebar;
  //   },
  //   device() {
  //     return this.$store.state.app.device;
  //   },
  //   fixedHeader() {
  //     return this.$store.state.settings.fixedHeader;
  //   },
  //   classObj() {
  //     return {
  //       hideSidebar: !this.sidebar.opened,
  //       openSidebar: this.sidebar.opened,
  //       withoutAnimation: this.sidebar.withoutAnimation,
  //       mobile: this.device === "mobile",
  //     };
  //   },
  // },
  // mixins: [ResizeMixin],
  setup() {
    const store = useStore();
    const sidebar = computed(() => store.state.app.sidebar);
    const opened  = computed(() => store.state.app.sidebar.opened);
    const hide  = computed(() => !store.state.app.sidebar.opened);
    const device = computed(() => store.state.app.device);
    const fixedHeader = computed(() => store.state.settings.fixedHeader);
    const classObj = reactive({
        hideSidebar: hide,
        openSidebar: opened,
        withoutAnimation: sidebar.withoutAnimation,
        mobile: device === "mobile",
    });
    // const classObj = reactive({
    //   hideSidebar: !store.state.app.sidebar.opened,
    //   openSidebar: store.state.app.sidebar.opened,
    //   withoutAnimation: store.state.app.sidebar.withoutAnimation,
    //   mobile: store.state.app.device === "mobile",
    // });

    // const classObj = reactive({
    //   sidebar: store.state.app.sidebar,
    //   open: store.state.app.sidebar.opened,
    //   openSidebar: opened,
    // })

    const handleClickOutside = () => {
      store.dispatch("app/closeSideBar", { withoutAnimation: false });
    };
    return {
      sidebar,
      device,
      fixedHeader,
      classObj,
      handleClickOutside,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
