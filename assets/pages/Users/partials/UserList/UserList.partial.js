import React from 'react';
import DataTable from '@/components/UI/DataTable/DataTable.component';
import UserCreate from '@/pages/Users/partials/UserCreate/UserCreate.partial';
import { useQuery } from '@/context/hazumi/hooks';
import Loading from '@/components/UI/Loading/Loading';

const UserList = () => {
    const { data, loading, refetch } = useQuery('user/list');

    if (loading) return <Loading text={`Chargement des utilisateurs`}/>;

    const users = data?.users ?? null;

    const columns = [{
        name: 'name',
        label: 'Nom'
    }, {
        name: 'username',
        label: 'Nom d\'utilisateur'
    }, {
        name: 'email',
        label: 'Email'
    }, {
        name: 'roles',
        label: 'Rôles',
        component: ({ roles }) => roles.map(role => {
            return (<div className="px-2 py-1 text-white" style={{backgroundColor:'#6366F1'}}>{ role }</div>)
        })
    }]

    return (
        <div>
            <UserCreate onSuccess={() => {
                refetch();
            }}/>
            <DataTable
                columns={columns}
                rows={users}/>
        </div>
    )
}

export default UserList
