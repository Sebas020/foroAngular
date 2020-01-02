import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../../models/topic';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService, TopicService]
})
export class EditComponent implements OnInit {
	public page_title: string;
	public topic: Topic;
	public identity;
	public token;
	public status;
	public is_edit;
  constructor(
  		private _userService: UserService,
  		private _router: Router,
  		private _route: ActivatedRoute,
  		private _TopicService: TopicService
  	) {
  		this.page_title = 'Editar Tema';
  		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.topic = new Topic('','','','','','',this.identity, null);
  		this.is_edit = true;
  	}

  ngOnInit() {
  	this.getTopic();
  }

  getTopic(){
  	this._route.params.subscribe(params =>{
  		let id= params['id'];

  		this._TopicService.getTopic(id).subscribe(
  			response=>{
  				if(!response.topic){
  					this._router.navigate(['/panel']);
  				}else{
  					this.topic = response.topic;
  				}
  			},
  			error =>{
  				console.log(error);
  			}
  		);
  	});
  }

  onSubmit(form){
  	var id = this.topic._id;
  	this._TopicService.update(this.token, id, this.topic).subscribe(
  		response =>{
  			if(!response.topic){
  				this.topic = response.topic;
  				this.status = 'success';
  			}else{
  				this.status = 'aqui';
  			}
  		},
  		error=>{
  			this.status = 'error';
  			console.log(error);
  		}
  	);
  }

}
