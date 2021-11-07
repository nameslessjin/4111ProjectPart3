import React from "react";
import PropTypes from "prop-types";
import { RouteChildrenProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import { http } from "../../config";


export interface State {
    secid: number;
    comment_content: string | null; 
}

export default class CommentInput extends React.Component<State, any>{
    static defaultProps = { 
        secid: 0,
        comment_content: ''
    }

    static propType = {
        secid: PropTypes.number,
        comment_content: PropTypes.string
    }

    constructor(props: any) {
        super(props);
        console.log(props)
        this.state = {comment_content: this.props.comment_content, secid: this.props.secid}
        console.log(this.state)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.setState({secid: this.props.secid})
    }

    handleChange(event: any) {
        console.log(event.target.value);
        this.setState({comment_content: event.target.value});
        
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const data = JSON.stringify({userid: localStorage.getItem("user_id"), section_id: this.state.secid, comment_content: this.state.comment_content})
        const url = http + 'postcomment'
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userid: localStorage.getItem("user_id"), secid: this.state.secid, comment_content: this.state.comment_content})
        })
        .then((res) => res.json())
        .then((res: any) => {
            console.log(res);
        })
        this.setState({comment_content: ''})
    }
    render() {
        return (
            <div className="card course-card">
                <div className="card-body">
                    <div className="input-group" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <form style={{width: '100%'}} onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-10">
                                    <textarea onChange={this.handleChange} style={{borderRadius: '10px', width: '100%', height: '100%', border: 'none'}}/>
                                </div>
                                <div className="col-2">
                                <input className="btn btn-primary" type="submit" id="button-addon2" style={{width: '100%', height: '100%'}} value="Post" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

