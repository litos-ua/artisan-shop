
import React, { useState } from 'react';
import { useInput } from 'react-admin';
import { TextField, Button, Grid, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const ItemCharacteristicsInput = ({ source }) => {
    const {
        field: { value = {}, onChange }
    } = useInput({ source });

    const [characteristics, setCharacteristics] = useState(value);

    const handleAddField = () => {
        setCharacteristics({ ...characteristics, '': '' });
    };

    const handleRemoveField = (key) => {
        const { [key]: _, ...rest } = characteristics;
        setCharacteristics(rest);
        onChange(rest);
    };

    const handleChange = (key, newKey, newValue) => {
        const updatedCharacteristics = { ...characteristics, [newKey]: newValue };
        if (key !== newKey) {
            delete updatedCharacteristics[key];
        }
        setCharacteristics(updatedCharacteristics);
        onChange(updatedCharacteristics);
    };

    return (
        <div>
            <Grid container spacing={2}>
                {Object.entries(characteristics).map(([key, value], index) => (
                    <Grid container item spacing={1} key={index}>
                        <Grid item xs={5}>
                            <TextField
                                label="Key"
                                value={key}
                                onChange={(e) => handleChange(key, e.target.value, value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                label="Value"
                                value={value}
                                onChange={(e) => handleChange(key, key, e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={() => handleRemoveField(key)}>
                                <Delete />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddField}>
                Add Characteristic
            </Button>
        </div>
    );
};

export default ItemCharacteristicsInput;

