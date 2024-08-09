import {Button, DialogTitle, Typography} from "@mui/material";
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

const CommitSummary = () => {

    const [repository, setRepository] = useState("")
    const [branch, setBranch] = useState("")
    const [commits, setCommits] = useState([])
    const [summary, setSummary] = useState("")

    const handleRepoChange = (event) => {
        setRepository(event.target.value)
        setBranch("")
        setCommits([])
        setSummary("")
    }

    const handleBranchChange = (event) => {
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
    }

    const handleSummary = () => {
        getSummary()
    }

    const copyContent = () => {
        navigator.clipboard.writeText(summary)
    }

    return (
        <SummaryContainer>
            <TitleAndSelectWrapper>
                <DialogTitle sx={{color: '#cdcbcb', fontSize: '30px', fontFamily: 'Times New Roman'}}>COMMIT
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
                    <CommitBox
                        repository={repository}
                        branch={branch}
                        commits={commits}
                        setCommits={setCommits}>
                    </CommitBox>
                </BoxContainer>
                <Button
                    onClick={handleSummary}
                    sx={{color: '#cdcbcb', padding: '10px', backgroundColor: '#3c3b3b', height: '40px'}}>
                    Generate
                </Button>
                <BoxContainer>
                    <Typography sx={{color: '#cdcbcb', padding: '10px'}}>{summary}</Typography>
                </BoxContainer>
                <Button
                    onClick={copyContent}
                    sx={{
                        color: '#cdcbcb',
                        padding: '10px',
                        backgroundColor: '#3c3b3b',
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

export default CommitSummary
