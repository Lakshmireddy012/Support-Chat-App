import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

export interface Item { name: string; }

@Component({
  selector: 'app-chat-template',
  templateUrl: './chat-template.component.html',
  styleUrls: ['./chat-template.component.css']
})
export class ChatTemplateComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  dates:any=[];
  selectedDate:any;
  allData:any=[];
  selectDate="Select Date";
  selectedData:any;
  currentItem:any;
  index = 0;
  items: Observable<Item[]>;
  constructor(public af: AngularFirestore,public authService: AuthService , public firebase: FirebaseService) {

  }
  
  logout(){
    this.authService.logout();
  }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(){
    this.itemsCollection = this.af.collection<Item>('messages');
    // this.items = this.itemsCollection.valueChanges();
    // this.items.subscribe((item:any)=> { 
    //   this.currentItem=item[0];

    //   console.log("values",item[0].key);
    // });
    this.firebase.getMessages().subscribe((val:any)=>{
      val.forEach(element => {
        var data=element.payload.doc.data();
        var dataArray=[];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const e = data[key];
            dataArray.push(e);
          }
        }
        this.allData.push(dataArray);
        this.dates.push(element.payload.doc.id);
      });
      this.selectedDate=this.dates[this.dates.length-1];
      this.selectedData=this.allData[this.allData.length-1];
      this.currentItem=this.selectedData[0][0];
      console.log("this ",this.selectedData,this.selectedDate);
    })
  }
  changeDate(index,item){
    this.selectedData=this.allData[index];
    this.selectDate=item;
  }
  showCurrentChat(currentItem,index){
    this.currentItem=currentItem;
    this.index = index;
    console.log("cur",currentItem);
  }

}
