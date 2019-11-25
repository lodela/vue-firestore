<template>
  <div class="hello">
    <form>
      New Todo:
      <input v-model="newTodo" type="text">
      <button type="submit"
              @click.prevent="addTodo()">add</button>
    </form>
    <ul>
      {{todos}}
      <li v-for="todo in todos"
          :key="todo.key">
        <p>{{todo}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from '../firebase'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data (){
    return {
      newTodo:'',
      todos:[],
      ref: firebase.firestore().collection('todos')
    }
  },
  methods:{
    addTodo(){
      
    }
  },
  created(){
    this.ref.onSnapshot((querySnapshot)=>{
      this.todos = [];
      querySnapshot.forEach((doc)=>{
        this.todos.push({
          key: doc.id,
          title: doc.data().text
        });
      });
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
