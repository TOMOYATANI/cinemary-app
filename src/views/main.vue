<template>
  <div>
    <Header />
    <Mainxllg class="main-xllg" />
    <Mainmd class="main-md" />
    <Mainsm class="main-sm" />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Mainxllg from "@/components/mainxllg.vue";
import Mainmd from "@/components/mainmd.vue";
import Mainsm from "@/components/mainsm.vue";

export default {
  components: {
    Header,
    Mainxllg,
    Mainmd,
    Mainsm
  }
};
</script>

<style scoped lang="scss">
// -- メディアクエリ -- //

$breakpoint-xl: 1025px;
$breakpoint-lg: 1024px;
$breakpoint-md: 600px;
$breakpoint-sm: 400px;

@mixin xl {
  @media (min-width: ($breakpoint-xl)) {
    @content;
  }
}
@mixin lg {
  @media (max-width: ($breakpoint-lg)) {
    @content;
  }
}
@mixin md {
  @media (max-width: ($breakpoint-md)) {
    @content;
  }
}
@mixin sm {
  @media (max-width: ($breakpoint-sm)) {
    @content;
  }
}

.main-xllg {
  @include xl {
    display: inline-block;
  }
  @include lg {
    display: inline-block;
  }
  @include md {
    display: none;
  }
  @include sm {
    display: none;
  }
}

.main-md {
  @include xl {
    display: none;
  }
  @include lg {
    display: none;
  }
  @include md {
    display: inline-block;
  }
  @include sm {
    display: none;
  }
}

.main-sm {
  @include xl {
    display: none;
  }
  @include lg {
    display: none;
  }
  @include md {
    display: none;
  }
  @include sm {
    display: inline-block;
  }
}
</style>
