import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";


export default function CommentInput() {
    const {register, handleSubmit} = useForm ({
        defaultValues: {
            comment: {text: '', secid: '0'}
        }
    })

    const onSubmit = (data: any) => console.log(data);
    return (
        <div className="container" style={{padding: '20px', width: '100%', display: 'flex'}}>
            <div className="input-group" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                        <textarea className="form-control" style={{width: '900px'}}/>
                        <button className="btn btn-primary" style={{width: '100px'}} type="button" id="button-addon2">Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
    
}