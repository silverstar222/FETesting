import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ViewComponent } from './components/view/view.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    { path: 'drinks', component: ListComponent, data: {
            animation: {
                value: 'default',
            }
        }
    },
    { path: 'drinks/:id', component: ViewComponent, data: {
            animation: {
                value: 'view',
            }
        }
    },
    { path: '',   redirectTo: '/drinks', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
