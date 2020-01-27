import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../config/api.service';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { VariableService } from 'src/app/config/variable.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['number', 'firstName', 'lastName', 'email', 'password', 'action'];

  // data  = [
  //   {firstName: 1, lastName: 'Hydrogen', email: 1.0079, password: 'H'},
  //   {firstName: 2, lastName: 'Helium', email: 4.0026, password: 'He'},
  //   {firstName: 3, lastName: 'Lithium', email: 6.941, password: 'Li'},
  //   {firstName: 4, lastName: 'Beryllium', email: 9.0122, password: 'Be'},
  //   {firstName: 5, lastName: 'Boron', email: 10.811, password: 'B'},
  //   {firstName: 6, lastName: 'Carbon', email: 12.0107, password: 'C'},
  //   {firstName: 7, lastName: 'Nitrogen', email: 14.0067, password: 'N'},
  //   {firstName: 8, lastName: 'Oxygen', email: 15.9994, password: 'O'},
  //   {firstName: 9, lastName: 'Fluorine', email: 18.9984, password: 'F'},
  //   {firstName: 10, lastName: 'Neon', email: 20.1797, password: 'Ne'},
  // ];

  // dataSource = new MatTableDataSource(this.data);
  data: any;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private variableService: VariableService,
    private apiService: ApiService,
    public dialog: MatDialog, 
    private cdRef:ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.apiService.getUsers().subscribe(result => {
      this.data = result;
      this.dataSource = new MatTableDataSource(this.data.users);
      this.dataSource.paginator = this.paginator;

      this.variableService.changeloadingStatus(false);
      
      this.cdRef.detectChanges();
    })

  }

  deleteUser(id: string) {
    this.apiService.deleteUser(id).subscribe(_ => {
      this.data.users.splice(this.data.users.findIndex(x => x.id === id), 1); // delete current user
      this.dataSource = new MatTableDataSource(this.data.users); // update users into datatable
      this.dataSource.paginator = this.paginator; // update paginator's quality 
    });
  } 

  openDialog(data: any): void {
    const dialogRef = this.dialog.open( EditFormComponent, {
      width: '500px',
      data
    })

    dialogRef.afterClosed().subscribe( _ => {
      this.apiService.getUsers().subscribe(result => {
        this.data = result;
        this.dataSource = new MatTableDataSource(this.data.users);
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  ngOnDestroy(){
  }

}
