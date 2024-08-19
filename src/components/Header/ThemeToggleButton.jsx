import { Box, Button } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";

export function ThemeToggleButton({ mode, toggleColorMode }) {
    return (
        <Box sx={{
            maxWidth: "4vh",
            backgroundColor: '#bbcfee',
            borderRadius: "10%",
            border: "2px solid blue",
            display: "inline-block",
        }}>
            <Button
                variant="text"
                onClick={toggleColorMode}
                size="medium"
                aria-label="button to toggle theme"
                sx={{ minWidth: "3vw",
                    height: "4vh",
                    p: "0.5vh",
                    paddingRight: "1.2vw",
                    display: 'flex',
                    justifyContent: 'center',  // Center the icon horizontally
                    alignItems: 'center',  // Center the icon vertically
                }}
            >
                {mode === "dark" ? (
                    <LightModeIcon fontSize="small" />
                ) : (
                    <ModeNightRoundedIcon fontSize="small" />
                )}
            </Button>
        </Box>
    );
}