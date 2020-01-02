import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../../models/topic';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, TopicService]
})
export class AddComponent implements OnInit {
	public page_title: string;
	public topic: Topic;
	public identity;
	public token;
	public status;
  constructor(
  		private _userService: UserService,
  		private _router: Router,
  		private _route: ActivatedRoute,
  		private _TopicService: TopicService
  	) {
  		this.page_title = 'Crear Nuevo Tema';
  		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.topic = new Topic('','','','','','',this.identity, null);
  	}

  ngOnInit() {
  	console.log(this._TopicService.prueba());
  }

  onSubmit(form){
  	this._TopicService.addTopic(this.token, this.topic).subscribe(
  		response=>{
  			if(response.topic){
  				this.status = 'success';
  				this.topic = response.topic;
  				this._router.navigate(['/panel']);
  			}else{
  				this.status = 'error';
  			}
  		},
  		error=>{
  			this.status = 'error';
  			console.log(error);
  		}
  	);
  }

}
