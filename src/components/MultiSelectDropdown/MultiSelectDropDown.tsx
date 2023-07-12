import React, { useState, useEffect } from "react";
import { Autocomplete, Checkbox, Chip } from "@mui/material";
import { TextField } from "@mui/material";
import dropdownService from "./multiselectdropdown.service";

const MultiSelectDropDown = (props: any) => {
    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<any[]>([]);

    useEffect(() => {
        setSelected([]);
        if (props?.options !== undefined && props?.options?.length > 0) {
            setList(props.options);
            setLoading(props.loading);
        }
        else {
            setLoading(true);
            dropdownService.fetchData(props.url)
                .then((response) => {
                    let options = response.data;
                    setList(options);
                    setLoading(false);
                });

        }

    }, [props]);

    return (
        <Autocomplete
            id={props.id}
            loading={loading}
            disabled={props.disabled}
            inputValue={props.inputValue}
            options={list}
            style={props.style}
            multiple
            value={selected}
            getOptionLabel={(option: any) => option.username}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.username}
                </li>
            )}
            disableCloseOnSelect
            onChange={(event, values) => {
                setSelected(values);
            }}
            renderTags={(options) =>
                options.map((option: any) => (
                    <Chip
                        style={{ marginRight: '5px' }}
                        key={option[props.optionId]}
                        label={option[props.optionLabel]}
                        onDelete={() => {
                            setSelected(selected.filter((e) => e.id !== option[props.optionId]))
                        }}
                    />
                ))
            }

            renderInput={(params) => <TextField {...params} label={props.label} />}
        />

    );
};

export default MultiSelectDropDown;