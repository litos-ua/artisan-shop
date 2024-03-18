
import React, { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export function SearchForm() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search/${search}`);
        setSearch("");
    };

    return (
        <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: 'auto',
                paddingLeft: '1vw',
                width: 0,
            }}
        >
            <Box sx={{ display: 'flex', ml: '2vw'}}>
                <TextField
                    type="text"
                    placeholder="Пошук"
                    variant="outlined"
                    size="small"
                    sx={{ width: '15vw', borderRadius: 2, marginRight: '5px', backgroundColor:'#9797', }}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: 'auto', height: '4.5vh' }}
                >
                    <SearchIcon />
                </Button>
            </Box>
        </Box>
    );
}

