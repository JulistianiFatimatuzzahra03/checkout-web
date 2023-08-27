<template>
    <center>
    <div class="m-10 max-w-sm">
  <div class="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
    <div class="relative mx-auto w-36 rounded-full">
      <img class="mx-auto h-auto w-full rounded-full" src="data:image/png;base64,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" alt="" />
    </div>
    <h3 class="font-lg text-semibold text-center leading-6 text-gray-600">Nama : {{ getUser.name}}</h3>
    <p class="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">Email : {{ getUser.email}}</p>
    <ul class="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
      <li class="flex items-center py-3 text-sm">
</li>
    </ul>
  </div>
</div>
</center>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters("auth", ["getUser"]),
        user() {
            return this.getUser;
        },
    },
    methods: {
        ...mapActions("auth", ["getUserInfo"]),
    },
    async mounted() {
        // Fetch user information
        const user = await this.getUserInfo();

        // If user information is retrieved, update the store
        if (user) {
            this.$store.commit("auth/SET_USER", user);
        }
    },
};
</script>
