import { isCli } from "./path";

export const SRC_PATH = isCli() ? 'src/' : '';
export const UNIAID_PATH = SRC_PATH + '_uniaid/';
export const VUE_TPL = `<template>
  <view class="">

  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
}
</script>
<style>

</style>
`;

