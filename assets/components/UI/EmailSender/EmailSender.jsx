import React from 'react';
import './EmailSender.styles.scss';
import { useForm } from 'react-hook-form';
import { checkError } from '@/components/UI';

import { FaTelegramPlane } from 'react-icons/fa';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { publicAssets } from '@/_metronic/helpers';


const EmailSender = ({ data, onClose }) => {
    

    const { register, reset, formState: { errors } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    React.useEffect(() => {
        reset({
            ...data
        })

        return () => {}
    }, [data, reset])

    const { attachment } = data ?? {};

    return (
        <div className={`email-sender ${data ? 'show' : 'hide'}`}>

            <div className="email-overlay" onClick={() => {
                if (typeof onClose === 'function') onClose();
            }}></div>
            
            <div className="email-wrapper">
                <div className="email-container">
                    <div className="email-header fs-3 fw-bold"><MdOutlineAttachEmail className="fs-1" /> Envoyer la facture par email au propriétaire</div>

                    <div className="email-body">
                        <div className="col-md-12 form-group mb-4">
                            <div className="form-label">Email du propriétaire *</div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Email du propriétaire *"
                                    className="form-control"
                                    {...register('email', { required: true })}/>
                            </div>
                            { checkError('email', errors) }
                        </div>

                        <div className="col-md-12 form-group mb-4">
                            <div className="form-label">Objet de l'email</div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Objet de l'email *"
                                    className="form-control"
                                    {...register('object', { required: true })}/>
                            </div>
                            { checkError('object', errors) }
                        </div>

                        <div className="col-md-12 form-group mb-4">
                            <div className="form-label">Contenu de l'email *</div>
                            <div className="input-group">
                                <textarea
                                    type="text"
                                    placeholder="Contenu de l'email *"
                                    className="form-control"
                                    {...register('message', { required: true })}/>
                            </div>
                            { checkError('message', errors) }
                        </div>

                        <div className="col-md-12 form-group mb-4">
                            <div className="form-label">Fichier joint : <a href={publicAssets(attachment?.filePath)} target="_blank" rel="noreferrer">{ attachment?.fileName }</a></div>
                        </div>

                        <div className="col-md-12 form-group mb-4">
                            Cet email sera envoyé au propriétaire et l'ensemble des négociateurs liés et le directeur de l'agence le recevront aussi en copie caché
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{width: `100%`}}>
                            <FaTelegramPlane className="me-2"/> Envoyer le mail
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default EmailSender
