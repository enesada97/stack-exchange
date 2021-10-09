import { DetailComponent } from './dialogs/detail/detail.component';
import { StackexchangeService } from './../../core/service/stackexchange.service';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Question } from 'src/core/models/question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [StackexchangeService],
})
export class QuestionsComponent {
  questionForm: FormGroup;
  searchedQuestions: Question[] = [];
  displayedColumns: string[] = [
    'question_id',
    'title',
    'actions',
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private stackexchangeService: StackexchangeService
  ) {
    this.questionForm = this.createForm();
  }
  createForm(): FormGroup {
    return this.fb.group({
      page: [1, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      pageSize: [1, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      fromDate: [null],
      toDate: [null],
      order: ['desc'],
      min: [null],
      max: [null],
      sort: ['activity'],
      q: [null],
      accepted: [null],
      answers: [null, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      body: [null],
      closed: ['True'],
      migrated: [null],
      notice: [null],
      nottagged: [null],
      tagged: [null],
      title: [null],
      user: [null, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      url: [null],
      views: [null, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      wiki: [null],
    });
  }
  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
  openDetail(row: Question){
    this.dialog.open(DetailComponent, {
      data:{
        question:row
      },
    });
  }
  onSubmit(): void {
    this.stackexchangeService
      .searchAdvanced(Object.assign({}, this.questionForm.value))
      .subscribe((data) => {
        this.searchedQuestions = data.items;
        console.log(this.searchedQuestions);
        this.dataSource = new MatTableDataSource<Question>(
          this.searchedQuestions
        );
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      },(err)=>{
        alert(err);
      },()=>{
        this.questionForm=this.createForm();
      });
  }
}
