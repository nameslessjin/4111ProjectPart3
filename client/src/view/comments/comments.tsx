import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import SectionComment from "../../component/sectionComment/sectionComment";
import './comments.css'
export default class Comments extends React.Component <RouteChildrenProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <SectionComment />
            </div>
        ) 
    }
}