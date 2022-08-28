import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Injector, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getBaseUrl } from '../../main';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
// import { TuiContextWithImplicit, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
// import { catchError, of } from 'rxjs';
// import { TUI_LAST_DAY, TuiDay } from '@taiga-ui/cdk';
// import { TuiNamedDay, TUI_ARROW } from '@taiga-ui/kit';
// import { TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
// import { AddEditPatient } from '.././models/addeditpatient';
// import { ModalService } from '../_modal';
// import { AddEditPatientComponent } from './../add-edit-patient/add-edit-patient.component';


// массив с тегами
const tags: readonly string[] = [
  `студент`,
  `VIP`,
  `ОМС`,
  `ДМС`,
  `скандальный`,
];

@Component({
  selector: 'patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})


export class PatientsList {
  bodyText: string = "";
  // readonly arrow = TUI_ARROW;
  isMenuActions: number | undefined = undefined;

  constructor(
    private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private router: Router,
    // private modalService: ModalService
  ) {
  }


  openActions(id: number) {
    this.isMenuActions = id;

  }

  closeActions(id: number) {
    this.isMenuActions = undefined;

  }

  public patients: Patient[] = [];
  length = 10;
  index = 0;
  fullnametosearch: string = "";
  value = 10;
  filterExpanded = false;
  items = [
    { id: 10, name: `10` },
    { id: 15, name: `15` },
    { id: 20, name: `20` },
  ];
  possibleTags: readonly string[] | undefined = [];
  fullnameSorting?= 1;
  birthdaySorting?= 0;
  genderSorting?= 0;
  addressSorting?= 0;
  phoneSorting?= 0;
  filterOpened = false;
  familynamefilter: string = "";
  namefilter: string = "";
  lastnameFilter: string = "";
  phoneFilter: string = "";
  emailFilter: string = "";
  addressFilter: string = "";
  // birthdayfrom: TuiDay | null = null;
  // birthdayto: TuiDay | null = null;
  genderFilterStr: string = "";
  genderFilter?: number = undefined;
  tagsFilter: string[] | undefined = [];
  openAddPatient = false;
  insuranceTypes: Pages[] | undefined = [];
  // editpatient: AddEditPatient | undefined;
  // currentpatient: AddEditPatient = new AddEditPatient(undefined, "", null, undefined,"","","","",[], "",null,"","","",undefined);
  modalmode: number = 0;

  gender = [
    0,
    1
  ];

  ngOnInit() {
    let currentFilter: FilterSettings = {
      pageNumber: this.index,
      rowsCount: this.length,
      fullname: undefined,
      fullnameSorting: this.fullnameSorting,
      birthdaySorting: this.birthdaySorting,
      genderSorting: this.genderSorting,
      addressSorting: this.addressSorting,
      phoneSorting: this.phoneSorting,
      tagsFilter: this.tagsFilter
    };
    this.http.post<Patient[]>('http://localhost:5268/patientlist', currentFilter).subscribe(result => {
      this.patients = result;
    }, error => console.error(error));
  }

  // @tuiPure
  // stringify(
  //   items: Pages[] | undefined,
  // ): TuiStringHandler<TuiContextWithImplicit<number>> {
  //   const map = new Map(items!.map(({ id, name }) => [id, name] as [number, string]));

  //   return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || ``;
  // }

  // onChanged(id: any) {
  //   this.modalService.close(id);
  // }

  onNameChange() {
    this.sendforsort();
  }

  goToPage(index: number): void {
    this.index = index;
    this.sendforsort();
  }

  changerowcount(rc: number) {
    this.length = rc;
    this.sendforsort();
  }

  async showFilter() {
    this.possibleTags = await this.http.get<string[]>('http://localhost:5268/tags').toPromise();
    this.filterOpened = this.filterOpened == true ? false : true;
  }

  sortingfio() {
    this.fullnameSorting = this.fullnameSorting == 1 ? 2 : 1;
    this.birthdaySorting = 0;
    this.genderSorting = 0;
    this.addressSorting = 0;
    this.phoneSorting = 0;
    this.sendforsort();
  }

  sortingbirthday() {
    this.birthdaySorting = this.birthdaySorting == 1 ? 2 : 1;
    this.fullnameSorting = 0;
    this.genderSorting = 0;
    this.addressSorting = 0;
    this.phoneSorting = 0;
    this.sendforsort();
  }

  sortinggender() {
    this.genderSorting = this.genderSorting == 1 ? 2 : 1;
    this.fullnameSorting = 0;
    this.birthdaySorting = 0;
    this.addressSorting = 0;
    this.phoneSorting = 0;
    this.sendforsort();
  }

  sortingaddress() {
    this.addressSorting = this.addressSorting == 1 ? 2 : 1;
    this.fullnameSorting = 0;
    this.birthdaySorting = 0;
    this.genderSorting = 0;
    this.phoneSorting = 0;
    this.sendforsort();
  }

  sortingphone() {
    this.phoneSorting = this.phoneSorting == 1 ? 2 : 1;
    this.fullnameSorting = 0;
    this.birthdaySorting = 0;
    this.genderSorting = 0;
    this.addressSorting = 0;
    this.sendforsort();
  }

  addmedcard() {
    this.router.navigate(['/add-medical-card']);
  }

  sendforsort() {
    let currentFilter: FilterSettings = {
      pageNumber: this.index,
      rowsCount: this.length,
      fullname: this.fullnametosearch,
      fullnameSorting: this.fullnameSorting,
      birthdaySorting: this.birthdaySorting,
      genderSorting: this.genderSorting,
      addressSorting: this.addressSorting,
      phoneSorting: this.phoneSorting,
      familynameFilter: this.familynamefilter,
      nameFilter: this.namefilter,
      lastnameFilter: this.lastnameFilter,
      phoneFilter: this.phoneFilter,
      emailFilter: this.emailFilter,
      addressFilter: this.addressFilter,
      // birthdayFromFilter: this.birthdayfrom,
      // birthdayToFilter: this.birthdayto,
      genderFilter: this.genderFilter,
      tagsFilter: this.tagsFilter
    };
    this.http.post<Patient[]>('http://localhost:5268/patientlist', currentFilter).subscribe(result => {
      this.patients = result;
    }, error => console.error(error));
  }
  //если понадобится валидация
  readonly filterForm = new UntypedFormGroup({
    lastName: new UntypedFormControl(``),
    firstName: new UntypedFormControl(``),
    thirdName: new UntypedFormControl(``),
    // birthDateStart: new UntypedFormControl(TuiDay.currentLocal()),
    // birthDateEnd: new UntypedFormControl(TuiDay.currentLocal()),
    filterPhone: new UntypedFormControl(``),
    filterEmail: new UntypedFormControl(``),
    filterAdress: new UntypedFormControl(``),
  });

  // фильтр по дате
  // min = new TuiDay(1900, 1, 1);
  // max = TuiDay.currentLocal();
  // dateItems = [
  //   new TuiNamedDay(
  //     TUI_LAST_DAY.append({ year: -1 }),
  //     `Until today`,
  //     TuiDay.currentLocal(),
  //   ),
  // ];
  // фильтр по тегам
  filterTags: string | null = ``;

  readonly control = new UntypedFormControl(null);

  // @tuiPure
  // filter(filterTags: string | null): readonly string[] {
  //   return this.possibleTags!.filter(item => TUI_DEFAULT_MATCHER(item, filterTags || ``));
  // }

  stopFilter() {
    this.clearFilter();
    this.sendforsort();
    this.showFilter();
  }

  useFilter() {
    this.genderFilter = this.genderFilterStr == "Мужской" ? 1 : (this.genderFilterStr == "Женский" ? 0 : undefined);
    this.sendforsort();
  }

  clearFilter() {
    this.familynamefilter = "";
    this.namefilter = "";
    this.lastnameFilter = "";
    this.phoneFilter = "";
    this.emailFilter = "";
    this.addressFilter = "";
    // this.birthdayfrom = null;
    // this.birthdayto = null;
    this.genderFilterStr = "";
    this.genderFilter = undefined;
  }

  genderValue = new UntypedFormControl(1);

  async showPatientDialog(idpat: number | undefined, id: string): Promise<void> {
    this.possibleTags = await this.http.get<string[]>('http://localhost:5268/tags').toPromise();
    //this.insuranceTypes = await this.http.get<Pages[]>('http://localhost:5268/insurancetypes').toPromise();
    // if (idpat)
    // {
    //   this.modalmode = 1; //редактирование пациента
    //   let curobj = {Id: idpat};
    //    let curpat = await this.http.post<AddEditPatient>('http://localhost:5268/patientaddedit', curobj).toPromise();
    //    if(curpat) {
    //       this.currentpatient.id = curpat.id;
    //       this.currentpatient.fullname = curpat.fullname;
    //       this.currentpatient.birthday = TuiDay.jsonParse(curpat.birthdaystr!);
    //       this.currentpatient.idgender = curpat.idgender;
    //       this.currentpatient.phonenumber = curpat.phonenumber;
    //       this.currentpatient.email = curpat.email;
    //       this.currentpatient.address = curpat.address;
    //       this.currentpatient.note = curpat.note;
    //       this.currentpatient.tags = curpat.tags;
    //       this.currentpatient.passportsernum = curpat.passportsernum;
    //       if(curpat.passportdatestr != null )
    //       {
    //         this.currentpatient.passportdate = TuiDay.jsonParse(curpat.passportdatestr!);
    //       }
    //       else
    //       {
    //         this.currentpatient.passportdate = null;
    //       }
    //       this.currentpatient.snils = curpat.snils;
    //       this.currentpatient.passportissuer = curpat.passportissuer;
    //       this.currentpatient.insurancesernum = curpat.insurancesernum;
    //       this.currentpatient.insurancetype = curpat.insurancetype;
    //    }
    // }
    // else
    // {
    //   this.modalmode = 2; //добавление пациента
    //   this.currentpatient.id = undefined;
    //   this.currentpatient.fullname = "";
    //   this.currentpatient.birthday = null;
    //   this.currentpatient.idgender = undefined;
    //   this.currentpatient.phonenumber = "";
    //   this.currentpatient.email = "";
    //   this.currentpatient.address = "";
    //   this.currentpatient.note = "";
    //   this.currentpatient.tags = [];
    //   this.currentpatient.passportsernum = "";
    //   this.currentpatient.passportdate = null;
    //   this.currentpatient.snils = "";
    //   this.currentpatient.passportissuer = "";
    //   this.currentpatient.insurancesernum = "";
    //   this.currentpatient.insurancetype = undefined;
    // }
    // this.modalService.open(id);
  }

  // closePatientDialog() {
  //   this.openAddPatient = false;
  // }

  // savePatient() {
  // let currentAddPatient = new  AddEditPatient( undefined,
  //   this.patientfullfio,
  //   birthday: this.patientbirthday,
  //   idgender: this.patientgender == 'women' ? 0 : (this.patientgender == 'men' ? 1 : undefined),
  //   phonenumber: this.patientphone,
  //   email: this.patientemail,
  //   address: this.patientaddress,
  //   note: this.patientnote,
  //   tags: this.patienttags,
  //   passportsernum: this.patientdocsernum,
  //   passportdate: this.patientdocdate,
  //   snils: this.patientsnils,
  //   passportissuer: this.patientdocissuer,
  //   insurancesernum: this.patientinsnumber,
  //   insurancetype: this.patientpoltype
  // };
  //   this.showpatienterror = false;
  //   this.http.put('http://localhost:5268/patientaddedit', this.currentpatient).subscribe(result => {
  // }, error => {
  //   this.patienterror = error.error.errorText;
  //   this.showpatienterror = true;
  // });
  // this.closePatientDialog();
  //  }

}



interface Patient {
  id?: number;
  fullname: string;
  birthday: string;
  gender: string;
  address: string;
  phone: string;
  tags: string[];
}

interface FilterSettings {
  pageNumber?: number;
  rowsCount?: number;
  fullname?: string;
  fullnameSorting?: number;
  birthdaySorting?: number;
  genderSorting?: number;
  addressSorting?: number;
  phoneSorting?: number;
  familynameFilter?: string;
  nameFilter?: string;
  lastnameFilter?: string;
  phoneFilter?: string;
  emailFilter?: string;
  addressFilter?: string;
  // birthdayFromFilter?: TuiDay | null;
  // birthdayToFilter?: TuiDay | null;
  genderFilter?: number;
  tagsFilter?: string[];
}

interface Pages {
  id: number;
  name: string;
}

// interface AddEditPatient{
//   id?: number;
//   fullname?: string;
//   birthday?: TuiDay | null;
//   idgender?: number;
//   phonenumber?: string;
//   email?: string;
//   address?: string;
//   note?: string;
//   tags?: string[];
//   passportsernum?: string;
//   passportdate?: TuiDay | null;
//   snils?: string;
//   passportissuer?: string;
//   insurancesernum?: string;
//   insurancetype?: number;
// }


