import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { FitUser } from 'src/app/models/fit-user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent {
  public users!: FitUser[];
  dataSource!: MatTableDataSource<FitUser>;

  displayedColumns: string[] = [ 'firstName', 'lastName', 'email', 'mobile', 'bmiResult', 'gender', 'package', 'enquiryDate', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private apiService: ApiService, private router: Router, private confirmService: NgConfirmService, private toastService: NgToastService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getRegisteredUser()
      .subscribe({
        next: (res) => {
          this.users = res;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  edit(id: string) {
    this.router.navigate(['update', id])
  }

  deleteUser(id: string) {
    this.confirmService.showConfirm("آیا مطمئن هستید که می خواهید حذف کنید؟",
      () => {
        //your logic if Yes clicked
        this.apiService.deleteRegistered(id)
          .subscribe({
            next: (res) => {
              this.toastService.success({ detail: 'موفقیت', summary: 'با موفقیت حذف شد', duration: 3000 });
              this.getUsers();
            },
            error: (err) => {
              this.toastService.error({ detail: 'خطا', summary: 'مشکلی پیش آمد!', duration: 3000 });
            }
          })
      },
      () => {
        //yor logic if No clicked
      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
