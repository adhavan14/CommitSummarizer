import {getListOfRepos} from "../services/GitHubProxy.jsx";
import {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import PropTypes from "prop-types";
import {RepoSelectContainer} from "./Styles.style.js";
import {useTheme} from "styled-components";

const RepoSelector = ({handleRepoChange, repository}) => {

    const currentTheme = useTheme()
    const [repos, setRepos] = useState([])

    const getRepositories = async () => {
        const repositories = await getListOfRepos()
        setRepos(repositories)
    }

    useEffect(() => {
        getRepositories()
    }, []);

    return (
        <RepoSelectContainer>
            <FormControl sx={{width: '200px'}}>
                <InputLabel id="repository-label" sx={{
                    color: currentTheme.fontColor,
                    "&.Mui-focused": {
                        color: '#7b7d7d',
                    }
                }}>Repository</InputLabel>
                <Select
                    label="Repository"
                    labelId="repository-label"
                    value={repository}
                    onChange={handleRepoChange}
                    sx={{
                        backgroundColor: currentTheme.menuColor,
                        color: currentTheme.fontColor,
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: '#7b7d7d',
                        }
                    }}
                    MenuProps={{
                        MenuListProps: {
                            sx: {backgroundColor: currentTheme.menuColor}
                        }
                    }}
                >
                    {
                        repos && repos.map((repo) => {
                            return <MenuItem key={repo.id} value={repo.name}
                                             sx={{color: currentTheme.fontColor}}>{repo.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </RepoSelectContainer>
    )
}

RepoSelector.propTypes = {
    handleRepoChange: PropTypes.func,
    repository: PropTypes.string,
}

export default RepoSelector