import { Component, OnInit } from "@angular/core";
import { Router, Params } from "@angular/router";
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  
  items: Array<any>;
  index = 0;
  error=false;
  success=false;

  constructor(
    public firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getMessages().subscribe(result => {
      this.items = result;
      console.log(this.items);
    });
  }

  viewItem(index) {
    this.index = index;
  }
  updateMessage(responseText) {
    var itemToUpdate = this.items[this.index].payload.doc;
    var res = this.firebaseService.updateMessage(itemToUpdate.id, responseText);
    itemToUpdate.data().responseText = responseText;
    this.success=true;
    setTimeout(() => {
      this.success=false;
    }, 5000);
  }

  // viewDetails(item){
  //   this.router.navigate(['/details/'+ item.payload.doc.id]);
  // }

  // capitalizeFirstLetter(value){
  //   return value.charAt(0).toUpperCase() + value.slice(1);
  // }

  // searchByName(){
  //   let value = this.searchValue.toLowerCase();
  //   this.firebaseService.searchUsers(value)
  //   .subscribe(result => {
  //     this.name_filtered_items = result;
  //     this.items = this.combineLists(result, this.age_filtered_items);
  //   })
  // }

  // rangeChange(event){
  //   this.firebaseService.searchUsersByAge(event.value)
  //   .subscribe(result =>{
  //     this.age_filtered_items = result;
  //     this.items = this.combineLists(result, this.name_filtered_items);
  //   })
  // }

  // combineLists(a, b){
  //   let result = [];

  //   a.filter(x => {
  //     return b.filter(x2 =>{
  //       if(x2.payload.doc.id == x.payload.doc.id){
  //         result.push(x2);
  //       }
  //     });
  //   });
  //   return result;
  // }
}
