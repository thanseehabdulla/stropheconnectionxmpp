import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
// import {Client} from 'node-xmpp-client';
import 'rxjs/Rx';
import 'strophe';



var connection;
var login=false;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
public domain:any;
// public connection:any;
public jid:any;
public password:any;
public address:any="http://192.168.1.114:7070/http-bind/";
public Strophe:any;
public loggedIn:any;
public username:any;
public sid:any;
public rid:any;
public sharedref:any={};




  constructor(public navCtrl: NavController,public http: Http) {

  }



onLogin(){
// alert("reached component");
// Setting up the variables


	 this.loggedIn=false;

 this.domain="pc3-pc;"
 this.jid=this.username;
 this.password="namoideen";



// alert("register post");
let url = 'http://192.168.1.114:9090/plugins/restapi/v1/users';
// let body = "username="+this.jid+"&password=vrai&name=Administrator&email=admin@example.com";
// let body = "username=admin777777&password=namoideen&name=Administrator&email=admin@example.com";
let body={
    "username": this.username,
    "password": "namoideen"
}
let head = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'secret'

});

this.http.post(url, body, {headers : head})
.map(res => res)
      .subscribe(data => {
           alert("success registeration"+JSON.stringify(data));
          //  console.log(data['_body']);

      })

connection=new Strophe.Connection(this.address);
connection.connect(this.jid+'@'+this.domain, this.password,function onConnect(status) {

  console.log('onConnect: '+status);

// alert("conencted");
if (status == Strophe.Status.CONNECTING) {
			console.log('Strophe is connecting.');
      // alert("connecting");
		} else if (status == Strophe.Status.CONNFAIL) {
			console.log('Strophe failed to connect.');
alert("confail");
    } else if (status == Strophe.Status.DISCONNECTING) {
			console.log('Strophe is disconnecting.');
alert("disconnecting");
    } else if (status == Strophe.Status.DISCONNECTED) {
			console.log('Strophe is disconnected.');
alert("disconencted");
    } else if (status == Strophe.Status.CONNECTED) {
alert("connected");
// alert(JSON.stringify($pres().tree()));

this.sid= $(status).attr('sid');
this.rid= $(status).attr('rid');
alert(JSON.stringify($(status).attr('sid')));
// this.connection.attach(this.jid, this.sid, this.rid, function(status){
//   if(status === Strophe.Status.ATTACHED){
// alert("Attached");
//   }
//
// });
// this.connection.send($pres().c('show').t('chat'));


        // We are adding handler function for accetping message response
				//ie handler function  [ onMessage() ]  will be call when the user recieves a new message


       // 	Setting our presence in the server. so that everyone can know that we are online
        connection.send(
                $msg(
                    {to : this.jid, type : 'chat'}
                    ).c('body').t($('#chattextinput').val())
                    );
                    alert("Send");
        				//The connection is established. ie user is logged in

        //Handler function for handling new Friend Request
				// this.connection.addHandler(this.on_subscription_request, null, "presence", "subscribe");
        try{


        connection.addHandler(function Message(msg) {

          // this.to = msg.getAttribute('to');
          // var from = msg.getAttribute('from');
          // var type = msg.getAttribute('type');
          var elems = $(msg).text();

          // if (type == "chat" && elems.length > 0) {
          //   var body = elems[0];
          //
          // }
          // we must return true to keep the handler alive.
          // returning false would remove it after it finishes.

         alert(elems);
         alert("message");
    //      var to = msg.getAttribute('to');
    // var from = msg.getAttribute('from');
    // var type = msg.getAttribute('type');
    // console.log(to+'  '+from+'   '+type);


// alert(from);
// alert(type);

         return true;
        }
, null, null, null, null, null);
        connection.send($pres().tree());
        alert("online");
        }catch(e){

        alert(e);
        }
				//Now finally go the Chats page

		}

}
);
connection.keepalive=true;
alert("sucessed finished");
}



onLogin2(){
  //Logout funcion

    // console.log("logout called");  //In chrome you can use console.log("TEXT") for dubugging
    // this.connection.options.sync = true; // Switch to using synchronous requests since this is typically called onUnload.
    // this.connection.flush();  //Removes all the connection variables
    // this.connection.disconnect(); //Disconnects from the server
    // alert("disconnected");

}



onRegister(){

// alert("reg");
//
//   this.connection.register("pc3-pc", this.callback, 60, 1);
// alert("reg3");
// }
//
//  callback(status) {
//    alert(status);
//    alert("Reg2");
//     if (status == "REGISTER") {
//         this.connection.register.fields.username = "test123456";
//         this.connection.register.fields.name = "test123456";
//         this.connection.register.fields.password = "namoideen";
//         this.connection.register.submit();
//     } else if (status === "REGISTERED") {
//         console.log("registered!");
//         this.connection.register.authenticate();
//         alert("registered");
//     } else if (status === Strophe.Status.CONNECTED) {
//       alert("connected");
//     } else if (status === Strophe.Status.DISCONNECTED) {
//         console.log("Disconnected from XMPP-Server");
// alert("Disconencted");


// register via rest api
alert("register post");

let url = 'http://192.168.1.114:9090/plugins/restapi/v1/users';
// let body = "username="+this.jid+"&password=vrai&name=Administrator&email=admin@example.com";
// let body = "username=admin777777&password=namoideen&name=Administrator&email=admin@example.com";
let body={
    "username": this.username,
    "password": "namoideen"
}
let head = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'secret'

});

this.http.post(url, body, {headers : head})
.map(res =>  res.json())
      .subscribe(data => {
           alert("success"+JSON.stringify(data));
           console.log(data['_body']);
      }, error => {
           console.log(error);// Error getting the data
      alert("Registered successfully");

        // this.navCtrl.push(Otp);
}
      //subscribe actions
      );




    }
}
