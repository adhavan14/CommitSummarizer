import {Button, DialogTitle, Switch, Typography} from "@mui/material";
import {useEffect, useState} from "react";
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
import {ThemeProvider} from "styled-components";

const CommitSummary = () => {

    const [theme, setTheme] = useState('light')
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

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme]);
    const handleThemeChange = (event) => {
        setTheme(event.target.checked ? 'dark' : 'light')
    }

    const colorTheme = {
        'light': {
            backgroundColor: '#cdcbcb'
        },
        'dark': {
            backgroundColor: '#3c3b3b'
        }
    }

    return (
        <SummaryContainer>
            <Switch onClick={handleThemeChange}></Switch>
            <TitleAndSelectWrapper>
                <DialogTitle sx={{
                    color: theme === 'dark' ? '#cdcbcb' : '#3c3b3b',
                    fontSize: '30px',
                    fontFamily: 'Times New Roman'
                }}>COMMIT
                    SUMMARIZER</DialogTitle>
                <ThemeProvider theme={theme === 'light' ? colorTheme['light'] : colorTheme['dark']}>
                    <SelectContainer>
                        <RepoSelector
                            handleRepoChange={handleRepoChange}
                            repository={repository}
                            theme={theme}>
                        </RepoSelector>
                        <BranchSelector
                            handleBranchChange={handleBranchChange}
                            branch={branch} repository={repository}
                            theme={theme}>
                        </BranchSelector>
                    </SelectContainer>
                </ThemeProvider>
            </TitleAndSelectWrapper>
            <BoxWrapper>
                <ThemeProvider theme={theme === 'light' ? colorTheme['light'] : colorTheme['dark']}>
                    <BoxContainer>
                        <CommitBox
                            repository={repository}
                            branch={branch}
                            commits={commits}
                            setCommits={setCommits}
                            theme={theme}>
                        </CommitBox>
                    </BoxContainer>
                </ThemeProvider>
                <Button
                    onClick={handleSummary}
                    sx={{
                        color: theme === 'dark' ? '#cdcbcb' : '#3c3b3b',
                        padding: '10px',
                        backgroundColor: theme === 'dark' ? '#3c3b3b' : '#cdcbcb',
                        height: '40px'
                    }}>
                    Generate
                </Button>
                <ThemeProvider theme={theme === 'light' ? colorTheme['light'] : colorTheme['dark']}>
                    <BoxContainer>
                        <Typography sx={{color: '#cdcbcb', padding: '10px'}}>{summary}</Typography>
                    </BoxContainer>
                </ThemeProvider>

                <Button
                    onClick={copyContent}
                    sx={{
                        color: theme === 'dark' ? '#cdcbcb' : '#3c3b3b',
                        padding: '10px',
                        backgroundColor: theme === 'dark' ? '#3c3b3b' : '#cdcbcb',
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
