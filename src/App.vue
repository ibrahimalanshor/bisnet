<template>
  <component :is="$route.meta.layout" v-bind="$route.meta.layoutProps || {}">
    <router-view />
  </component>
</template>
