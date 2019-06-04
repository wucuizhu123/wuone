<template>
<div>
      <template v-for="navMenu in navMenus">
          <el-menu-item :index="'/'+navMenu.url"   v-if="!navMenu.children.length>0"
                        :key="navMenu.id" :data="navMenu"  >
                      <!-- <i :class="navMenu.icon"></i> -->
                      <span slot="title">{{navMenu.name}}</span>
          </el-menu-item>
          <el-submenu v-if="navMenu.children.length>0"
                      :key="navMenu.id" :data="navMenu" :index="'/'+navMenu.url">
                      <template slot="title">
                        <!-- <i :class="navMenu.icon"></i> -->
                        <span> {{navMenu.name}}</span>
          </template>
            <!-- 递归 -->
            <NavMenu :navMenus="navMenu.children"></NavMenu>
          </el-submenu>
       </template>
</div>
</template>
<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {}
    },
    methods: {}
  }
</script>