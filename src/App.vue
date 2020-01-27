<template>
  <div class="full">
    <h1>Hello {{ name }}</h1>
    <div class="flex two demo">
      <div>
        <nicebutton title="Add item" v-on:clickEvent="addItem()"></nicebutton>
        <div v-for="(item, index) in items" v-bind:key="index">
          <article class="card">
            <header>
              <h3>{{item.name}}</h3>
            </header>
            <footer>
              <nicebutton v-bind:title="'Delete'" v-on:clickEvent="removeItem(index)">
              </nicebutton>
            </footer>
          </article>
        </div>
      </div>
      <div>
        <pre>{{JSON.stringify(items, null, 2)}}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import nicebutton from './NiceButton.vue'

export default {
  components: {
    nicebutton
  },
  methods: {
    removeItem(index) {
      console.log('App.removeItem', index);
      this.$delete(this.items, index)
    },
    addItem() {
      console.log('App.addItem');
      let newItem = {};
      if (this.items.length === 0) {
        newItem.uid = 0;
        newItem.name = 'Item 0';
      } else {
        let lastItem = this.items[this.items.length - 1];
        newItem.uid = lastItem.uid + 1;
        newItem.name = 'Item ' + (lastItem.uid + 1);
      };
      this.items.push(newItem);
    },
  },
  data() {
    return {
      name: 'Jane Doe',
      items: [{
        uid: 0,
        name: 'Item 0'
      }, {
        uid: 1,
        name: 'Item 1'
      }]
    }
  }
}
</script>

<style scoped>
.card footer {
  padding: .2em .8em;
}
</style>