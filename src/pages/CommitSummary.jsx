import {Backdrop, Button, CircularProgress, DialogTitle, Typography} from "@mui/material";
import {useState} from "react";
import {getSummaryByCommits} from "../services/ChatBotProxy.jsx";
import RepoSelector from "../component/RepoSelector.jsx";
import BranchSelector from "../component/BranchSelector.jsx";
import CommitBox from "../component/CommitBox.jsx";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import {
    BoxContainer,
    BoxWrapper,
    SelectContainer,
    SummaryContainer,
    TitleAndSelectWrapper
} from "../component/Styles.style.js";
import PropTypes from "prop-types";
import {useTheme} from "styled-components";

const CommitSummary = ({handleThemeChange}) => {

    const currentTheme = useTheme()
    const [repository, setRepository] = useState("")
    const [branch, setBranch] = useState("")
    const [commits, setCommits] = useState([])
    const [summary, setSummary] = useState("")
    const [summaryLoader, setSummaryLoader] = useState(false)
    const [commitLoader, setCommitLoader] = useState(false)

    const handleRepoChange = (event) => {
        setRepository(event.target.value)
        setBranch("")
        setCommits([])
        setSummary("")
    }

    const handleBranchChange = (event) => {
        setCommitLoader(true)
        setBranch(event.target.value)
        setCommits([])
        setSummary("")
    }

    const getSummary = async () => {
        const totalCommits = []
        commits && commits.map((commit) => {
            totalCommits.push(commit.commit.message)
        })
        const summary = await getSummaryByCommits(totalCommits)
        setSummary(summary)
        setSummaryLoader(false)
    }

    const handleSummary = () => {
        setSummaryLoader(true)
        setSummary("")
        getSummary()
    }

    const copyContent = () => {
        navigator.clipboard.writeText(summary)
    }


    return (
        <SummaryContainer>
            <Button
                sx={{
                    color: currentTheme.fontColor,
                    ':hover': {
                        backgroundColor: currentTheme.button.hoverColor,
                    },
                    backgroundColor: currentTheme.button.bgColor,
                }}
                onClick={handleThemeChange}>
                {currentTheme.component}
            </Button>
            <TitleAndSelectWrapper>
                <DialogTitle sx={{
                    color: currentTheme.fontColor,
                    fontSize: '30px',
                    fontFamily: 'Times New Roman'
                }}>COMMIT
                    SUMMARIZER</DialogTitle>
                <SelectContainer>
                    <RepoSelector
                        handleRepoChange={handleRepoChange}
                        repository={repository}>
                    </RepoSelector>
                    <BranchSelector
                        handleBranchChange={handleBranchChange}
                        branch={branch} repository={repository}>
                    </BranchSelector>
                </SelectContainer>
            </TitleAndSelectWrapper>
            <BoxWrapper>
                <BoxContainer>
                    <Backdrop open={commitLoader} sx={{position: 'absolute',backgroundColor: currentTheme.bgLoader}}>
                        <CircularProgress sx={{color: currentTheme.loader}}/>
                    </Backdrop>
                    <CommitBox
                        repository={repository}
                        branch={branch}
                        commits={commits}
                        setCommits={setCommits}
                        setCommitLoader={setCommitLoader}>
                    </CommitBox>
                </BoxContainer>
                <Button
                    onClick={handleSummary}
                    sx={{
                        ':hover': {
                            backgroundColor: currentTheme.button.hoverColor
                        },
                        color: currentTheme.button.fontColor,
                        padding: '10px',
                        backgroundColor: currentTheme.button.bgColor,
                        height: '40px'
                    }}>
                    Generate
                </Button>
                <BoxContainer>
                    <Backdrop open={summaryLoader} sx={{position: 'absolute',backgroundColor: currentTheme.bgLoader}}>
                        <CircularProgress sx={{color: currentTheme.loader}}/>
                    </Backdrop>
                    <Typography sx={{
                        color: currentTheme.fontColor,
                        padding: '10px'
                    }}>{summary}</Typography>
                </BoxContainer>
                <Button
                    onClick={copyContent}
                    sx={{
                        ':hover': {
                            backgroundColor: currentTheme.button.hoverColor
                        },
                        color: currentTheme.button.fontColor,
                        padding: '10px',
                        backgroundColor: currentTheme.button.bgColor,
                        height: '40px',
                        position: 'absolute',
                        marginBottom: '750px',
                        marginLeft: '1250px',
                    }}>
                    <ContentCopyIcon></ContentCopyIcon>
                </Button>
            </BoxWrapper>
        </SummaryContainer>
    )
}

CommitSummary.propTypes = {
    handleThemeChange: PropTypes.func,
}

export default CommitSummary
