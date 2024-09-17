import {useEffect, useState} from "react";
import {getListOfBranches} from "../services/GitHubProxy.jsx";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import PropTypes from "prop-types";
import {BranchSelectContainer} from "./Styles.style.js";
import {useTheme} from "styled-components";

const BranchSelector = ({handleBranchChange, branch, repository}) => {

    const currentTheme = useTheme();
    const [branches, setBranches] = useState([])

    const getBranches = async () => {
        const resultBranch = await getListOfBranches(repository)
        setBranches(resultBranch)
    }

    useEffect(() => {
        repository && getBranches()
    }, [repository]);

    return (
        <BranchSelectContainer>
            <FormControl sx={{width: '200px'}}>
                <InputLabel id="branch-label" sx={{
                    color: currentTheme.fontColor,
                    "&.Mui-focused": {
                        color: '#7b7d7d',
                    }
                }}>Branch</InputLabel>
                <Select
                    label="Branch"
                    labelId="branch-label"
                    value={branch}
                    onChange={handleBranchChange}
                    sx={{
                        backgroundColor: currentTheme.menuColor,
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: '#7b7d7d'
                        },
                        color: currentTheme.fontColor
                    }}
                    MenuProps={{
                        MenuListProps: {
                            sx: {backgroundColor: currentTheme.menuColor}
                        }
                    }}
                >
                    {
                        branches && branches.map((bran) => {
                            return <MenuItem key={bran.id} value={bran.name}
                                             sx={{color: currentTheme.fontColor}}>{bran.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </BranchSelectContainer>
    )
}

BranchSelector.propTypes = {
    handleBranchChange: PropTypes.func,
    branch: PropTypes.string,
    repository: PropTypes.string,
}

export default BranchSelector