import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FitUser } from 'src/app/models/fit-user.model';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  userId!: string;
  userDetails!: FitUser;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['id'];
      this.fetchUserDetails(this.userId);
    })
  }

  fetchUserDetails(userId: string) {
    this.api.getRegisteredUserId(userId)
      .subscribe({
        next: (res) => {
          this.userDetails = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}
