<template>
  <v-card
    v-if="value"
    :color="`#${value.code.replace(/-/g, '').slice(-6)}`"
    dark
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline" v-text="value.name"></v-card-title>
        <v-card-subtitle v-text="value.created_at"></v-card-subtitle>
        <v-card-text>
          <div>{{ value.code }}</div>
          <div>{{ value.price }} $</div>
        </v-card-text>
      </div>
      <v-avatar class="ma-3" tile size="150">
        <v-img :src="`https://loremflickr.com/320/240/${value.name}`">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-avatar>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="blue darken-1" text @click="$emit('input', {})"
        >Close</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProductView',
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped></style>
