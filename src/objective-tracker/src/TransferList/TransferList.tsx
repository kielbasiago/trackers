import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NameBit } from "../ForceChecks/NameBit";
import { CheckPreset, checkPresets } from "../ForceChecks/nfpPresets";
import { TransferListGroup } from "./types";

const StyledContainer = styled(Paper)`
    border-radius: 0;
    height: 100%;
`;

type TransferListProps = {
    category: string;
    groups: TransferListGroup;
    title: string;
    items: NameBit[];
};

export default function TransferList({ category, groups, items, title }: TransferListProps) {
    const [checked, setChecked] = React.useState<NameBit[]>([]);
    const [left, setLeft] = React.useState<NameBit[]>(items);
    const [right, setRight] = React.useState<NameBit[]>([]);

    const [grouped] = React.useState(true);
    const [selected, setSelected] = React.useState("");

    useEffect(() => {
        setSelected(right.map((z) => z.value).join(","));
    }, [right]);

    const checksById = useMemo(
        () =>
            Object.entries(items).reduce(
                (acc, [title, bit]) => ({
                    ...acc,
                    [bit.value]: bit,
                }),
                {} as Record<number, NameBit>
            ),
        [items]
    );

    const bitSort = useCallback(
        (a: NameBit, b: NameBit) => {
            if (items.indexOf(a) < items.indexOf(b)) {
                return -1;
            }
            if (items.indexOf(a) > items.indexOf(b)) {
                return 1;
            }
            return 0;
        },
        [items]
    );

    const not = useCallback((a: NameBit[], b: NameBit[]) => {
        return a.filter((value) => b.indexOf(value) === -1);
    }, []);

    const intersection = useCallback((a: NameBit[], b: NameBit[]) => {
        return a.filter((value) => b.indexOf(value) !== -1);
    }, []);

    const union = useCallback(
        (a: NameBit[], b: NameBit[]) => {
            return [...a, ...not(b, a)];
        },
        [not]
    );

    const updateValues = (value: number[]) => {
        const bits = value.filter((z) => z != null);
        const l = [...left, ...right];
        const r = bits.map((bit) => checksById[bit]);
        setLeft(not(l, r).sort(bitSort));
        setRight(r);
    };

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = useCallback(
        (value: NameBit) => () => {
            const currentIndex = checked.indexOf(value);
            const newChecked = [...checked];

            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }

            setChecked(newChecked);
        },
        [checked]
    );

    const numberOfChecked = useCallback(
        (items: NameBit[]) => intersection(checked, items).length,
        [checked, intersection]
    );

    const handleToggleAll = useCallback(
        (items: NameBit[]) => () => {
            if (numberOfChecked(items) === items.length) {
                setChecked(not(checked, items));
            } else {
                setChecked(union(checked, items));
            }
        },
        [checked, not, numberOfChecked, union]
    );

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked).sort(bitSort));
        setLeft(not(left, leftChecked).sort(bitSort));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked).sort(bitSort));
        setRight(not(right, rightChecked).sort(bitSort));
        setChecked(not(checked, rightChecked).sort(bitSort));
    };

    const customList = React.useCallback(
        (title: React.ReactNode, items: NameBit[]) => {
            const subheader = (
                <>
                    <div>
                        {numberOfChecked(items)}/{items.length} {category.toLowerCase()} selected
                    </div>
                </>
            );
            return (
                <Card>
                    <CardHeader
                        sx={{ px: 2, py: 1 }}
                        avatar={
                            <Checkbox
                                onClick={handleToggleAll(items)}
                                checked={numberOfChecked(items) === items.length && items.length !== 0}
                                indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                                disabled={items.length === 0}
                                inputProps={{
                                    "aria-label": "all items selected",
                                }}
                            />
                        }
                        title={title}
                        subheader={subheader}
                    />
                    <Divider />
                    <List
                        sx={{
                            width: 400,
                            height: 500,
                            bgcolor: "background.paper",
                            overflow: "auto",
                        }}
                        dense
                        component="div"
                        role="list"
                    >
                        {items.map((value: NameBit) => {
                            const labelId = `transfer-list-all-item-${value.name}-label`;

                            return (
                                <ListItem key={value.value} role="listitem" button onClick={handleToggle(value)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{
                                                "aria-labelledby": labelId,
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.name} />
                                </ListItem>
                            );
                        })}
                        <ListItem />
                    </List>
                </Card>
            );
        },
        [category, checked, handleToggle, handleToggleAll, numberOfChecked]
    );

    const groupedList = (title: React.ReactNode, items: NameBit[]) => {
        const subheader = (
            <>
                <div>
                    {numberOfChecked(items)}/{items.length} checks selected
                </div>
            </>
        );

        return (
            <Card>
                <CardHeader
                    sx={{ px: 2, py: 1 }}
                    avatar={
                        <Checkbox
                            onClick={handleToggleAll(items)}
                            checked={numberOfChecked(items) === items.length && items.length !== 0}
                            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                            disabled={items.length === 0}
                            inputProps={{
                                "aria-label": "all items selected",
                            }}
                        />
                    }
                    title={title}
                    subheader={subheader}
                />
                <Divider />
                <List
                    sx={{
                        width: 400,
                        height: 500,
                        bgcolor: "background.paper",
                        overflow: "auto",
                    }}
                    dense
                    component="div"
                    role="list"
                >
                    {Object.entries(groups).map(([title, checks]) => {
                        const groupItems = checks.filter((check) => items.includes(check));
                        console.log(groupItems);
                        if (!groupItems.length) {
                            return null;
                        }
                        return (
                            <>
                                <ListItem key={title}>{title}</ListItem>
                                {groupItems.map((value: NameBit) => {
                                    const labelId = `transfer-list-all-item-${value.name}-label`;

                                    return (
                                        <ListItem
                                            key={value.value}
                                            role="listitem"
                                            button
                                            onClick={handleToggle(value)}
                                        >
                                            <ListItemIcon>
                                                <Checkbox
                                                    checked={checked.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{
                                                        "aria-labelledby": labelId,
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={value.name} />
                                        </ListItem>
                                    );
                                })}
                            </>
                        );
                    })}
                </List>
            </Card>
        );
    };

    const [preset, setPreset] = useState<CheckPreset | null>(null);

    return (
        <StyledContainer>
            <FormControl fullWidth>
                <InputLabel id="preset-select-label">Presets</InputLabel>
                <Select<CheckPreset | null>
                    labelId="preset-select-label"
                    id="preset-select"
                    value={preset}
                    label="Presets"
                    onChange={(e, child) => {
                        const val = e.target.value as unknown as CheckPreset;
                        setPreset(val);
                        const newSelected = val.value.map((bit) => bit.value);
                        setSelected(newSelected.join(","));
                        updateValues(newSelected);
                    }}
                >
                    {checkPresets.map((p) => (
                        <MenuItem key={p.name} value={p as unknown as any}>
                            {p.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Grid container spacing={2} flexDirection={"column"}>
                <Grid item>
                    <Typography style={{ padding: 16 }} variant={"h6"}>
                        {title}
                    </Typography>
                </Grid>
                <Grid container item spacing={2}>
                    <Grid item flex={0}>
                        {grouped ? groupedList(category, left) : customList(category, left)}
                    </Grid>
                    <Grid container item justifyContent="center" flex={0}>
                        <Grid container direction="column" alignItems="center" justifyContent={"center"}>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item flex={0}>
                        {grouped ? groupedList("Chosen", right) : customList("Chosen", right)}
                    </Grid>
                </Grid>
            </Grid>

            <TextField
                style={{ padding: 16, width: 400 }}
                label={"Flagstring"}
                multiline
                rows={3}
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                onBlur={(e) =>
                    updateValues(
                        e.target.value
                            .split(",")
                            .map((z) => Number.parseInt(z))
                            .filter((z) => !!z)
                    )
                }
            />
        </StyledContainer>
    );
}
