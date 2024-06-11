import React from 'react';
import { useRecordContext } from 'react-admin';
import { Typography } from '@mui/material';

export const ItemCharacteristicsField = ({ source }) => {
    const record = useRecordContext();
    if (!record || !record[source]) return null;

    return (
        <div>
            {Object.entries(record[source]).map(([key, value]) => (
                <Typography key={key} variant="body2">
                    <strong>{key}:</strong> {value}
                </Typography>
            ))}
        </div>
    );
};

ItemCharacteristicsField.defaultProps = {
    source: 'item_characteristics',
};

