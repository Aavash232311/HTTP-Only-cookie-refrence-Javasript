import Button from '@mui/material/Button';
import {MdCreateNewFolder} from 'react-icons/md';
import * as React from 'react';

let overflow = 0;
export default function SideNav(params) {


    const sideNav = {
        float: "left",
        width: "15%",
        backgroundColor: "#1D2327",
        height: '1500px',
        position: "fixed",
        color: "white",
        userSelect: "none"
    }

    const sideNavLabel = {
        float: "left", marginLeft: "5px",
    }

    const sideNavButtons = {
        color: "white", fontWeight: "bold", marginBottom: "1px solid white"
    }

    const sideNavIcons = {
        fontSize: "24px", marginLeft: "5px", marginTop: "-5px"
    }

    const DynamicNavModule = (params) => {
        if (params.bool === false) {
            return (
                <div>
                    <center>
                        <h5>Teacher Control Panel </h5>
                    </center>
                    <br/>
                    <div style={sideNavLabel}>
                        <Button style={sideNavButtons}>Creat Classroom <MdCreateNewFolder style={sideNavIcons}/>
                        </Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }

    return (
        <div>
            <div style={sideNav}>
                <DynamicNavModule bool={params.type}/>
            </div>
        </div>
    )
}