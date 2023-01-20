import styled from "styled-components"

import { Paper, InputBase, IconButton, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

function CommuSidebar(params) {
    return (
        <Sidebar>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: '2rem' }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder=""
                />
                <IconButton type="button" sx={{ p: '10px', color: '#FCA311' }} aria-label="search">
                    <Search />
                </IconButton>
            </Paper>
            <Button variant="contained" className="submit" fullWidth style={{height:"2.5rem", backgroundColor: "#FCA311"}}> <b>글 쓰기</b></Button>
        </Sidebar>
    )
}

const Sidebar = styled.div`
    width: 15%;
    
    background-color: #14213D;
    color: white;
    
    border-radius: 10px;
    padding: 10px;
    margin: 0 10px 0 20px;
`

export default CommuSidebar