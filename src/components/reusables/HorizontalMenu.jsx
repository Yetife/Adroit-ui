import {useEffect, useState} from 'react';
import {Divider, Tab, Tabs, ThemeProvider} from "@mui/material";
import themes from "./theme.jsx";

const HorizontalMenu = ({activeTab, handleChange, tabMenu }) => {
    const [currentTab, setActiveTab] = useState(0);
    console.log('menu', tabMenu)

    useEffect(() => {
        setActiveTab(activeTab)
        console.log('true', setActiveTab(activeTab))
    }, [activeTab]);
    return (
        <div>
            <div>
                <ThemeProvider theme={themes}>
                    <Tabs
                        textColor="inherit"
                        indicatorColor={"transparent"}
                        value={currentTab}
                        onChange={(event, newValue) => handleChange(event,newValue)}
                        style={{ display: 'block', cursor:'pointer',  marginLeft:'-25px' }}
                        orientation="horizontal"
                        // variant="scrollable"
                    >
                        {tabMenu.map((menu) =>(
                            <Tab key={menu.id} label={ <div style={{textTransform:'capitalize',fontFamily: 'Inter', fontSize: '18px', fontWeight: 600}}>{menu.name}</div>}
                                 value={menu.id}
                                 style={{
                                     color: currentTab === menu.id ? '#4A5D58' : '#343838', // Set custom text color
                                     borderBottom: currentTab === menu.id ? '5px solid #072320' : 'none', // Set custom border color for the selected tab
                                 }}
                                 />
                        ))}
                    </Tabs>
                </ThemeProvider>
            </div>

        </div>
    );
};

export default HorizontalMenu;