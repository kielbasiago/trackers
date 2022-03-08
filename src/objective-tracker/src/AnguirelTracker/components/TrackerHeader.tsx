import Typography from "@mui/material/Typography";
import startCase from "lodash/startCase";
import React, { useState } from "react";
import { useTrackerContext } from "./TrackerProvider";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TrackerMode, TrackerBackground, TrackerThemeMode, TrackerFont } from "../types";
import { useTrackerSettings } from "../../settings/settings";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

type Props = Record<string, unknown>;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`;

const Title = styled.span`
    flex: 1;
`;

const Options = styled.span`
    flex: 0;
`;

const NormalTypography = styled(Typography)`
    font-family: "Roboto";
`;

export function TrackerHeader(props: Props): JSX.Element {
    const {} = props;
    const { data } = useTrackerContext();
    const settings = useTrackerSettings();
    const {
        font,
        mode,
        background: theme,
        themeMode,
        setFont,
        setMode,
        setBackground: setTheme,
        setThemeMode,
        characterTag,
        setCharacterTag,
    } = settings;

    const modeDisplay = `v1.1`;

    const [showOptions, setShowOptions] = useState(false);
    const [showShare, setShowShare] = useState(false);

    const options = (
        <div style={{ display: "flex" }}>
            <Tooltip title={"Get OBS Info"}>
                <IconButton size="small" onClick={() => setShowShare(true)}>
                    <ShareIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={"Settings"}>
                <IconButton size="small" onClick={() => setShowOptions(true)}>
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
    const shareDialog = (
        <Dialog open={showShare} onBackdropClick={() => setShowShare(false)}>
            <DialogTitle></DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => setShowShare(false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );

    const dialog = (
        <Dialog open={showOptions} onBackdropClick={() => setShowOptions(false)}>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <Typography variant="body2" style={{ marginBottom: 16 }}>
                    Edit the options below. These are stored locally and will not retain between devices.
                </Typography>
                <FormControl fullWidth style={{ marginTop: 8, marginBottom: 8 }}>
                    <InputLabel id="tracker-mode-select-label">Tracking Mode</InputLabel>
                    <Select
                        labelId="tracker-mode-select-label"
                        id="tracker-mode-select"
                        value={mode}
                        label="Mode"
                        disabled
                        variant="standard"
                        onChange={() => setMode(mode === TrackerMode.AUTO ? TrackerMode.MANUAL : TrackerMode.AUTO)}
                    >
                        <MenuItem value={TrackerMode.AUTO}>Auto</MenuItem>
                        <MenuItem value={TrackerMode.MANUAL}>Manual</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth style={{ marginTop: 8, marginBottom: 8 }}>
                    <InputLabel id="tracker-theme-select-label">Tracker Background</InputLabel>
                    <Select
                        labelId="tracker-theme-select-label"
                        id="tracker-theme-select"
                        value={theme}
                        label="Tracker Background"
                        variant="standard"
                        onChange={(event) => setTheme(event.target.value as TrackerBackground)}
                    >
                        <MenuItem value={TrackerBackground.ANGUIREL}>Anguirel (Emotracker Gated View)</MenuItem>
                        <MenuItem value={TrackerBackground.DARK}>Dark (Emotracker Broadcast View)</MenuItem>
                        <MenuItem value={TrackerBackground.TRANSPARENT}>Transparent</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth style={{ marginTop: 8 }}>
                    <InputLabel id="tracker-font-select-label">Font</InputLabel>
                    <Select
                        labelId="tracker-font-select-label"
                        id="tracker-font-select"
                        value={font}
                        label="Font"
                        variant="standard"
                        onChange={(event) => setFont(event.target.value as TrackerFont)}
                    >
                        <MenuItem value={TrackerFont.DEFAULT}>Default</MenuItem>
                        <MenuItem value={TrackerFont.FF6}>FF6</MenuItem>
                    </Select>
                </FormControl>

                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={characterTag} onChange={(_e, checked) => setCharacterTag(checked)} />
                        }
                        label="Show Character Check Progress"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={themeMode === TrackerThemeMode.DARK}
                                onChange={(_e, checked) =>
                                    setThemeMode(checked ? TrackerThemeMode.DARK : TrackerThemeMode.LIGHT)
                                }
                            />
                        }
                        label="Dark Mode"
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => setShowOptions(false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
    return (
        <Container className={"tracker-header"}>
            <Title>{modeDisplay}</Title>
            <div style={{ flex: 1 }}></div>
            <Options>{options}</Options>
            {dialog}
            {shareDialog}
        </Container>
    );
}

export default TrackerHeader;
