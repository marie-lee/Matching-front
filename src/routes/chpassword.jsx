

import AuthPassword from '@/pages/password/change-authpw-page';
import MainLayout from '@/layouts/main/main-layout';

import { PATHS } from '@/routes/paths';

const chpassword = {
    path : 'authpassw',
    element : <MainLayout />,
    children : [
        {
            index: true,
            element: <AuthPassword />,
        },
        
    ]

};



export default chpassword;