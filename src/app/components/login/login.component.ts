import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, public router: Router) {}

  ngOnInit() {}
  login(username, password) {
    console.log("u and p ", username, password);
    this.afAuth.auth
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        console.log("success");
        this.router.navigate(["/chat"]);
      })
      .catch(error => console.log(error));
  }
}
