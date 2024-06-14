
import React from 'react';
import { useRecordContext } from 'react-admin';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const CollapsibleItemCharacteristicsField = ({ source }) => {
    const record = useRecordContext();
    if (!record || !record[source]) {
        return null;
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Item Characteristics</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <pre>{JSON.stringify(record[source], null, 2)}</pre>
            </AccordionDetails>
        </Accordion>
    );
};

