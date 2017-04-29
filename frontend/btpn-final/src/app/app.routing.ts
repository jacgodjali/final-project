import { Routes, RouterModule } from '@angular/router';

import { ContactlistComponent } from './contactlist/contactlist.component';
// import { ReportItemComponent } from './report-item.component';

const appRoutes: Routes = [
  // { path: 'employees/add', component: EmployeeFormComponent },
  // { path: 'report', component: ReportItemComponent },
  { path: 'employee/:id', component: ContactlistComponent},
  { path: 'employee', pathMatch: 'full', redirectTo: 'employee/' },
  { path: '', pathMatch: 'full', redirectTo: 'employee/' }
];

export const Routing = RouterModule.forRoot(appRoutes);