import { Routes } from '@angular/router';
import { PagebookComponent } from './pages/pagebook/pagebook.component';
import { MainComponent } from './layouts/main/main.component';
import { AccountbookComponent } from './pages/accountbook/accountbook.component';
import { PagechatgptComponent } from './pages/pagechatgpt/pagechatgpt.component';

export const routes: Routes = [
    {
        path:'',
        component:MainComponent,
        children:[
            {
                path:'book',
                component:PagebookComponent
            },
            {
                path:'accountBook',
                component:AccountbookComponent
            },
            {
                path:'chatgpt',
                component:PagechatgptComponent
            }
        ]
    },

];
