import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  todolist = [];

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {}

  async showAddTodo(){
    let alert = await this.alertCtrl.create({
      header: 'Add Todo Item',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Title'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Description'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            data.id = new Date().getTime();
            this.addTodo(data);
            this.presentToast('Successfully Added!');
            console.log(data,'Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  async showUpdateTodo(item){
    let alert = await this.alertCtrl.create({
      header: 'Update Todo Item',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Title',
          value: item.title,
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Description',
          value: item.description,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Update',
          handler: (data) => {
            data.id = item.id;
            this.updateTodo(data);
            this.presentToast('Successfully Updated!');
            console.log(data,'Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async showDeleteTodo(item){
    let alert = await this.alertCtrl.create({
      header: 'Add Todo Item',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.deleteTodo(item);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  addTodo(item){
    this.todolist.push(item);
  }

  updateTodo(item){
    let index = this.todolist.findIndex(x => x.id == item.id);
    this.todolist[index] = item;
  }

  deleteTodo(item){
    let index = this.todolist.findIndex(x => x.id == item.id);
    this.todolist.splice(index,1);
  }

  


  

}
