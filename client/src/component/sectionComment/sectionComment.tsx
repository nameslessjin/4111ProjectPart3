import React from "react";
import PropTypes from "prop-types";
import SingleComment from "./singleComment";


export interface SectionCommentProps {
    section_comment: {username: string, text: string, date:string}[]
}

export default class SectionComment extends React.Component<SectionCommentProps> {
    static defaultProps = {
        section_comment: []
    }

    static propType = {
        section_comment: PropTypes.array
    }

    render() {
        const {section_comment} = this.props;
        return (
            <div className="container container-section-comment">
                <div className="section-title-container">
                    <h2 className="section-title" style={{fontWeight: 'bold'}}>Comments</h2>
                </div>

                {section_comment.map((c) => (
                    <SingleComment comment={c} />
                ))}
                
            </div>
        )
    }
}