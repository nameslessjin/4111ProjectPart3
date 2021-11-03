import React from "react";
import { RouteChildrenProps } from "react-router-dom";
import './course.css'
export default class Course extends React.Component<RouteChildrenProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return(
            
            <div className="container py-4">
                <div className="card course-card">
                <div className="card-body">
                    
                    <h2 className="course-title">INTRODUCTION TO DATABASES</h2>
                    <h5 className="card-subtitle mb-2 text-muted">Instructor: Alexandros Biliris</h5>
                    <hr className="infobar"></hr>
                
                
                    <div className="card course-info-card">
                        <div className="card-body">
                            
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <h4>Section Number: 003</h4>
                                </li>
                                <li className="list-group-item">
                                    <h4>Call Number: 12452</h4>
                                </li>
                                <li className="list-group-item">
                                    <h4>Time: F 1:10PM-3:40PM</h4>
                                </li>
                                <li className="list-group-item">
                                    <h4>Location: 402 Chandler</h4>
                                </li>
                                <li className="list-group-item">
                                    <h4>Description</h4>
                                    <p>Prerequisites: (COMS W3134) or (COMS W3137) or (COMS W3136) and fluency in Java); or the instructor's permission. The fundamentals of database design and application development using databases: entity-relationship modeling, logical design of relational databases, relational data definition and manipulation languages, SQL, XML, query processing, physical database tuning, transaction processing, security. Programming projects are required.</p>
                                </li>
                            </ul> 
                                
                        </div>
                    </div>
                </div>
                </div>

            </div>
            
        )
    }
}