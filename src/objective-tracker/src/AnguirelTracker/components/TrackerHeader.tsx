import Typography from "@mui/material/Typography";
import startCase from "lodash/startCase";
import React, { useState } from "react";
import { useTrackerContext } from "./TrackerProvider";
import styled from "@emotion/styled";
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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "@mui/icons-material/FileCopyOutlined";
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

const ListItemText = styled(Typography)`
    flex: 1;
    float: left;
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

    const modeDisplay = `v1.2`;

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

    const hideItems = ".tracker-header, .tracker-log { display: none }";
    const bg = ".tracker-background { background: transparent }";

    const customCss = (
        <>
            <div>{hideItems}</div>
            <div>{bg}</div>
        </>
    );
    const shareDialog = (
        <Dialog open={showShare} onBackdropClick={() => setShowShare(false)}>
            <DialogTitle>OBS Options</DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <ListItemText>URL:</ListItemText>
                        <ListItemText>
                            <Tooltip title={`Copy URL to clipboard`}>
                                <span>
                                    Current URL
                                    <CopyToClipboard
                                        text={window.location.href.replace("showHeader=true", "showHeader=false")}
                                    >
                                        <IconButton size="small">
                                            <CopyIcon />
                                        </IconButton>
                                    </CopyToClipboard>
                                </span>
                            </Tooltip>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Width:</ListItemText>
                        <ListItemText>600px</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Height:</ListItemText>
                        <ListItemText>541px</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Custom CSS:</ListItemText>
                        <ListItemText style={{ paddingLeft: 8 }}>
                            {customCss}
                            <Tooltip title={`Copy CSS to clipboard`}>
                                <span>
                                    <CopyToClipboard text={`${hideItems} ${bg}`}>
                                        <IconButton size="small">
                                            <CopyIcon />
                                        </IconButton>
                                    </CopyToClipboard>
                                </span>
                            </Tooltip>
                            <div>
                                <Typography variant="caption">
                                    Change background: transparent above to{" "}
                                    <Link target="_blank" href="https://www.w3schools.com/cssref/css_colors.asp">
                                        any CSS color you want!
                                    </Link>
                                </Typography>
                            </div>
                        </ListItemText>
                    </ListItem>
                </List>
            </DialogContent>
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
