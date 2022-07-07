import React from 'react';
import { NavLink } from 'react-router-dom';
import { Loading, DataTable, Block, BlockTitle, Currency, SweetAlert } from '@/components/UI';
import { useQuery } from '@/context/hazumi/hooks/useQuery';
import { useMutation } from '@/context/hazumi/hooks/useMutation';
import { FaEye , FaTimes, FaPrint } from 'react-icons/fa';
import Moment from 'react-moment';
import 'moment-timezone';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';

const CommandeList = ({defaultBoutique}) => {

    const [filters, setFilters] = React.useState(null);
    const [print] = useMutation('commande/print');

    const { data, loading, refetch } = useQuery('commande/list',{
            variables: {
            filters
        }   
    });

    React.useEffect(() => {
        if (defaultBoutique) refetch();
      
        return () => {}
      }, [defaultBoutique])

    const [deleteCommande] = useMutation('commande/delete');
    if (loading) return <Loading text={`Chargement liste des reservations`}/>;
    const commandes = data?.commandes ?? null;
    const page = data?.page ?? {};

    const removeCommande = (id) => {
        SweetAlert.fire({
            icon: 'question',
            title: <p>Suppression du reservation</p>,
            text: `Voulez-vous vraiment supprimer cette reservation?`,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            showCancelButton: true,
            // showCloseButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCommande({
                    commandeId: id
                }).then(() => refetch())
                Swal.fire({
                    icon: 'success',
                    text: 'reservation est supprimé avec succès'
                });
            }
        })
    }

    const columns = [{
        label: 'Date',
        component: (row) => {
            return (
                <div className="flex">
                    <Moment format="DD/MM/YYYY">
                        {row.dateCreation}
                    </Moment> &nbsp;
                </div>
            )
        }
    }, {
        name: 'user.name',
        label: 'Client',
    }, {
        name: 'user.email',
        label: 'Email'
    }, {
        name: 'montantTotal',
        label: 'Montant total',
        component: ({ montantTotal }) => <div><Currency value={montantTotal} /></div>
    }, {
        name: 'action',
        label: 'Action',
        component: ({ id }) => {
            return (
                <div className="flex items-center">
                    <NavLink to={`/commande/${id}`}>
                        <button
                            className="mx-1 px-2 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                            title="Consulter vos commande"
                        >
                            <FaEye />
                        </button>
                    </NavLink>
                    <button
                        onClick={() =>  removeCommande(id)}
                        className="mx-1 px-2 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                        title="Supprimer vos commande"
                    >
                    <FaTimes /> 
                </button>
                </div >
            )
        }
    }]

    return (
        <Block>
            <BlockTitle 
                title={"liste des reservation"}
            />

            <NavLink to='/commandes/create'>
                <button 
                    className="mb-2 px-4 py-2 mr-2 rounded text-white hover:bg-green-600" style={{backgroundColor:'#6366F1'}}>
                    + Nouvelle reservation
                </button>
            </NavLink>

            <div className="mt-3">
                <DataTable
                    columns={columns}
                    rows={commandes}
                    page={page}
                    onFilter={(filters) => setFilters(filters)}
                />
            </div>
        </Block>
    )
}
const mapStateToProps = (state) => {
    const { defaultBoutique } = state.AuthReducer?.user;

    return {
        defaultBoutique
    }
}

export default connect(mapStateToProps)(CommandeList);