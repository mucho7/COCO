import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Paper, InputBase, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';


export default function CommuSearchbar() {
    const [ searchParams, setSearchParams ] = useSearchParams()

    const [ searchTarget, setSearchTarget ] = useState("title")
    const [ searchWord, setSearchWord] = useState(null)

    const onTypingHandler = (e) => {
        setSearchWord(e.target.value)
    }

    // setSearchTarget을 활용할 수 있는 드롭박스


    const onSearchClickHandler = () => {
        searchParams.set(searchTarget, searchWord)
        setSearchParams(searchParams)
        // const getSearchedList = async () => {
        //     await boardSearching(
        //         {searchWord: searchWord, searchTarget: searchTarget},
        //         (data) => {
        //             return data.data
        //         },
        //         (err) => console.log(err)
        //     )
        //     .then((res) => {
        //         console.log(res)
        //         console.log(searchParams)
        //     })
        // }
        // getSearchedList()
    }

    return (
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: '2rem' }}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search For More" onChange={onTypingHandler}/>
            <IconButton onClick={onSearchClickHandler} type="button" sx={{ p: '10px', color: '#FCA311' }} aria-label="search">
                <Search />
            </IconButton>
        </Paper>
    );
}