import {useEffect} from "react";
import {getListOfCommits} from "../services/GitHubProxy.jsx";
import PropTypes from "prop-types";
import {List, ListItem, ListItemText} from "@mui/material";
import CommitIcon from '@mui/icons-material/Commit';
import {useTheme} from "styled-components";

const CommitBox = ({repository, branch, commits, setCommits, setCommitLoader}) => {

    const currentTheme = useTheme();

    const getCommits = async () => {
        const commits = await getListOfCommits(repository, branch)
        setCommitLoader(false)
        setCommits(commits)
    }


    useEffect(() => {
        branch && getCommits()
    }, [branch]);

    return (

        <List sx={{padding: '10px'}}>

            {
                commits && commits.map((commit) => {
                    return <ListItem key={commit.sha}
                                     sx={{
                                         borderRadius: '10px',
                                         backgroundColor: currentTheme.commits.bgColor, marginBottom: '5px',
                                         color: currentTheme.fontColor,
                                     }}>
                        <CommitIcon sx={{marginRight: '10px'}}></CommitIcon>
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
    setCommits: PropTypes.func,
    setCommitLoader: PropTypes.func,
}

export default CommitBox