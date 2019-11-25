<template>
  <div class="hello">
    <b-row>
      <b-col></b-col>
      <b-col cols="12" sm="10" lg="8" xl="6">
        <h2>Board List</h2>
        <b-link @click.stop="addEdit()">(Add Board)</b-link>
        <b-table striped hover :items="boards" :fields="fields" responsive="sm">
          <template v-slot:cell(Actions)="row">
            <b-button-group>
              <b-button size="sm" variant="outline-dark" @click="row.toggleDetails">
                <font-awesome-icon icon="eye"/>
              </b-button>
              <b-button size="sm" variant="outline-danger" @click.stop="deleteboard(row.item.key)">
                <font-awesome-icon icon="trash-alt"/>
              </b-button>
              <b-button size="sm" variant="outline-primary" @click.stop="addEdit(row.item)">
                <font-awesome-icon icon="edit"/>
              </b-button>
            </b-button-group>
          </template>
          <template v-slot:row-details="row">
            <b-card>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Author:</b></b-col>
                <b-col class="text-sm-left">{{ row.item.author }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right text-xm-left"><b>Description:</b></b-col>
                <b-col class="text-sm-left text-xm-left">{{ row.item.description }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
                <b-col class="text-sm-left">{{ row.item.isActive }}</b-col>
              </b-row>
            </b-card>
          </template>
        </b-table>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-modal
      v-model="show"
      id="editBoard"
      ref="modal"
      title="Submit Your Name"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="author"
          label-for="author-input"
          invalid-feedback="Name of author is required">
          <b-form-input
            id="author-input"
            v-model="addEditBoard.author"
            :state="nameState"
            required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="nameState"
          label="Description"
          label-for="description-input"
          invalid-feedback="Description is required">
          <b-form-input
            id="description-input"
            v-model="addEditBoard.description"
            :state="nameState"
            required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="nameState"
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required">
          <b-form-input
            id="title-input"
            v-model="addEditBoard.title"
            :state="nameState"
            required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="nameState"
          label="Is Active"
          label-for="isActive-select"
          invalid-feedback="Title is required">
          <b-form-select 
            id="isActive-select" 
            v-model="addEditBoard.isActive"
            :options="options"></b-form-select>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import firebase from '../firebase'
import router from '../router'

export default {
  name: 'BoardList',
  props: {
    msg: String
  },
  data (){
    return {
      fields:[
        { title:{label:'Title',sortable:true, 'class':'text-left'}}, 'Actions'
      ],
      boards:[],
      addEditBoard:{
        author:null,
        description:null,
        title:null,
        isActive:this.selected
      },
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: true, text: 'Esta Activo' },
        { value: false, text: 'No esta activo' }
      ],
      show:false,
      isEdit:null,
      errors:[],
      name: '',
      submittedNames: [],
      nameState: null,
      ref: firebase.firestore().collection('boards')
    }
  },
  methods:{
    details(board){
      router.push({name:'ShowBoard',params:{id:board.key}})
    },
    addEdit(data){
      if(data){
        this.addEditBoard = data;
        this.isEdit = true;
      }else{
        this.isEdit = false;
        this.resetModal();
      }
      this.show = true;
    },
    deleteboard (id) {
      firebase.firestore().collection('boards').doc(id).delete().then(() => {
        // router.push({

        // })
      }).catch((error) => {
        alert("Error removing document: ", error);
      });
    },
    resetModal() {
      this.selected = null,
      this.addEditBoard.author = null,
      this.addEditBoard.description = null,
      this.addEditBoard.title = null,
      this.addEditBoard.isActive = this.selected
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    checkFormValidity() {
      return this.$refs.form.checkValidity()
    },
    handleSubmit() {
      if (false === !!this.checkFormValidity()) {
        // this.nameState = 'invalid';
        return
      }
      if(true == !!this.isEdit){
        const updateRef = firebase.firestore().collection('boards').doc(this.addEditBoard.key);
              updateRef.set(this.addEditBoard).then(()=> {
                this.$refs.modal.hide();
              }).catch((error) => {
                alert("Error adding document: ", error);
              });
      }else{
        this.ref.add(this.addEditBoard).then(() => {
          this.$refs.modal.hide();
        })
        .catch((error) => {
          alert("Error adding document: ", error);
        });
      }

      // Hide the modal manually
      // this.$nextTick(() => {
      //   this.$refs.modal.hide()
      // })
    }
  },
  created(){
    this.ref.onSnapshot((querySnapshot)=>{
      this.boards = [];
      querySnapshot.forEach((doc)=>{
        this.boards.push({
          key: doc.id,
          title: doc.data().title,
          author: doc.data().author,
          description: doc.data().description,
          isActive:doc.data().isActive
        });
      });
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table{
  width:70%;
  margin: 0 auto;
}
</style>
