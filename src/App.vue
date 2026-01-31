<template>
  <component
    :is="$route.meta.layout || 'div'"
    v-bind="$route.meta.layoutProps || {}"
  >
    <router-view />
  </component>
</template>
