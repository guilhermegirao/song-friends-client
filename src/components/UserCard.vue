<template>
  <div
    :class="[
      loadingOnActions ? 'scale-90' : '',
      'card',
      'bg-cover',
      'bg-center',
      'shadow-xl',
      'md:w-[400px]',
      'w-full',
      'md:h-[600px]',
      'h-full',
      'ease-out',
      'duration-300',
    ]"
    v-bind:style="{
      'background-image': 'url(' + (data?.avatar || '/images/avatar.svg') + ')',
    }"
  >
    <div></div>
    <div
      class="left-0 bottom-0 w-full px-5 py-5 absolute bg-gradient-to-b from-transparent to-neutral"
    >
      <h2 class="font-semibold mb-2 text-3xl">{{ firstName(data?.name) }}</h2>

      <div class="flex flex-row flex-wrap">
        <div
          class="badge badge-ghost badge-lg mr-[10px] mt-[10px]"
          v-for="genre in genres"
          :key="genre"
        >
          {{ genre }}
        </div>
        <div
          class="badge badge-ghost badge-lg mr-[10px] mt-[10px]"
          v-if="
            data?.similar_genres &&
            countElements(data?.similar_genres) > genresLimit
          "
        >
          e +{{ countElements(data?.similar_genres) - genresLimit }} parecidos
        </div>
        <div
          class="badge badge-ghost badge-lg mr-[10px] mt-[10px]"
          v-if="data?.genres && countElements(data?.genres) > genresLimit"
        >
          e +{{ countElements(data?.genres) - genresLimit }}
        </div>
      </div>
      <div class="card-actions flex items-center justify-evenly" v-if="buttons">
        <button
          class="btn btn-ghost focus:btn-error border-error select-none rounded-full w-[60px] h-[60px]"
          @click="handleDeclineAction"
          :disabled="loadingOnActions"
        >
          <img
            src="/images/cancel-icon.svg"
            class="w-[35px] h-[35px] object-cover select-none"
          />
        </button>
        <button
          class="btn btn-ghost focus:btn-primary border-primary select-none rounded-full w-[60px] h-[60px]"
          @click="handleAcceptAction"
          :disabled="loadingOnActions"
        >
          <img
            src="/images/heart-icon.svg"
            class="w-[40px] h-[40px] object-cover"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genres: [],
      genresLimit: 8,
      loadingOnActions: false,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    buttons: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    if (this.data?.similar_genres?.length > 0) {
      this.genres = this.data?.similar_genres?.slice(0, this.genresLimit - 1);
    } else if (this.data?.genres) {
      this.genres = this.data?.genres?.slice(0, this.genresLimit - 1);
    }
  },
  methods: {
    countElements: (array) => {
      return array.length;
    },
    firstName: (name) => {
      return name.replace(/ .*/, "");
    },
    handleDeclineAction() {
      this.loadingOnActions = true;
      this.$emit("decline-action", this.data?._id);
    },
    handleAcceptAction() {
      this.loadingOnActions = true;
      this.$emit("accept-action", this.data?._id);
    },
  },
  watch: {
    data() {
      this.loadingOnActions = false;
    },
  },
};
</script>
