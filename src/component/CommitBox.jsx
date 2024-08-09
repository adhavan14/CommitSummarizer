import {useEffect, useState} from "react";
import {getListOfCommits} from "../services/GitHubProxy.jsx";
import PropTypes from "prop-types";
import {List, ListItem, ListItemText} from "@mui/material";
import CommitIcon from '@mui/icons-material/Commit';

const CommitBox = ({repository, branch, commits, setCommits}) => {

    const getCommits = async () => {
        const commits = await getListOfCommits(repository,branch)
        setCommits(commits)
    }

    useEffect(() => {
        branch && getCommits()
    }, [branch]);

    return (
        <List sx={{padding:'10px'}}>

            {
            commits && commits.map((commit) => {
                    return <ListItem  key={commit.sha} sx={{backgroundColor:'#D3D3D3', marginBottom:'5px'}}>
                        <CommitIcon sx={{marginRight:'10px'}}></CommitIcon>
                        <ListItemText>{commit.commit.message}</ListItemText></ListItem>
            })
            }
        </List>
    )
}

CommitBox.propTypes = {
    repository: PropTypes.string,
    branch: PropTypes.string,
    commits: PropTypes.array,
    setCommits: PropTypes.func
}

export default CommitBox