import {useEffect, useState} from "react";
import {getListOfBranches} from "../services/GitHubProxy.jsx";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import PropTypes from "prop-types";
import {BranchSelectContainer} from "./Styles.style.js";

const BranchSelector = ({handleBranchChange, branch, repository, theme}) => {

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
                    color: theme === 'dark' ? '#cdcbcb' : '#3c3b3b',
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
                        backgroundColor: theme === 'dark' ? '#3c3b3b' : '#cdcbcb',
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: '#7b7d7d'
                        },
                        color: theme === 'dark' ? '#cdcbcb' : '#3c3b3b'
                    }}
                    MenuProps={{
                        MenuListProps: {
                            sx: {backgroundColor: theme === 'dark' ? '#3c3b3b' : '#cdcbcb'}
                        }
                    }}
                >
                    {
                        branches && branches.map((bran) => {
                            return <MenuItem key={bran.id} value={bran.name}
                                             sx={{color: theme === 'dark' ? '#cdcbcb' : '#3c3b3b'}}>{bran.name}</MenuItem>
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
    theme: PropTypes.string
}

export default BranchSelector